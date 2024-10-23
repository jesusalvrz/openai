<script lang="ts">
    interface Embedding {
        resourceId: number;
        content: string;
        embedding: number[];
    }

    let content = '';
    let responseMessage = '';
    let embeddingsList: Embedding[] = [];
  
    const crearEmbedding = async () => {
      responseMessage = '';
  
      if (!content.trim()) {
        responseMessage = 'Por favor, ingresa algún contenido.';
        return;
      }
  
      try {
        const response = await fetch('/api/resources', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content }),
        });
  
        if (!response.ok) {
          throw new Error('Error al crear el recurso');
        }
  
        const data = await response.json();
        responseMessage = data.message;
      } catch (error) {
        console.error('Error en el manejo del envío:', error);
        responseMessage = 'Ocurrió un error al crear el recurso.';
      }
    };

    const recuperarEmbedding = async () => {
        try {
            const response = await fetch('/api/resources');
            if (!response.ok) {
                throw new Error('Error al obtener los embeddings');
            }
            embeddingsList = await response.json();
        } catch (error) {
            console.error('Error al obtener los embeddings:', error);
            responseMessage = 'Ocurrió un error al obtener los embeddings.';
        }
    };
  </script>
  
  <main>
    <h1>Crea un nuevo recurso</h1>
    <textarea
        bind:value={content}
        placeholder="Ingresa el contenido aquí..."
        rows="4"
        cols="50"
    ></textarea>
    <br />
    <button on:click={crearEmbedding}>Crear Recurso</button>
    <button on:click={recuperarEmbedding}>Recuperar Embeddings</button>

    {#if responseMessage}
        <p>{responseMessage}</p>
    {/if}

    {#if embeddingsList.length > 0}
        <h2>Embeddings Recuperados:</h2>
        <ul>
            {#each embeddingsList as embedding}
                <li>
                    <strong>Content:</strong> {embedding.content} <br />
                    <!--<strong>Embedding:</strong> {JSON.stringify(embedding.embedding)}-->
                </li>
            {/each}
        </ul>
    {/if}
    </main>
  
<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
  }

  textarea {
    width: 100%;
    max-width: 600px;
    margin-bottom: 1rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
    font-size: 16px;
  }

  button:hover {
    background-color: #45a049;
  }
</style>