<script lang="ts">
    let content = ''; // Variable para almacenar el contenido de la caja de texto
    let responseMessage = ''; // Variable para mostrar la respuesta al usuario
  
    const handleSubmit = async () => {
      responseMessage = ''; // Reinicia el mensaje de respuesta
  
      // Verifica que el contenido no esté vacío
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
          body: JSON.stringify({ content }), // Envía el contenido como JSON
        });
  
        if (!response.ok) {
          throw new Error('Error al crear el recurso');
        }
  
        const data = await response.json();
        responseMessage = data.message; // Muestra la respuesta del servidor
      } catch (error) {
        console.error('Error en el manejo del envío:', error);
        responseMessage = 'Ocurrió un error al crear el recurso.';
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
    <button on:click={handleSubmit}>Crear Recurso</button>
  
    {#if responseMessage}
      <p>{responseMessage}</p> <!-- Muestra la respuesta al usuario -->
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
  