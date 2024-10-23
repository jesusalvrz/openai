<script lang="ts">
    export let success;
    export let error;
    let nombre = '';
    let apellidos = '';
    let edad = '';
    let telefono = '';
  </script>
  
  <form method="post">
    <label>
      Nombre:
      <input type="text" name="nombre" bind:value={nombre} required />
    </label>
  
    <label>
      Apellidos:
      <input type="text" name="apellidos" bind:value={apellidos} required />
    </label>
  
    <label>
      Edad:
      <input type="number" name="edad" bind:value={edad} required />
    </label>
  
    <label>
      Teléfono:
      <input type="text" name="telefono" bind:value={telefono} required />
    </label>
  
    <button type="submit">Guardar Paciente</button>
  </form>
  
  {#if error}
    <p style="color: red;">{error}</p>
  {/if}
  
  {#if success}
    <p style="color: green;">{success}</p>
  {/if}
  