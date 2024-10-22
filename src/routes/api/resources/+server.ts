// src/routes/api/resources/+server.ts
import { createResource } from '../../../lib/actions/resources';
import { getResources } from '../../../lib/server/getResources';

export async function POST({ request }) {
  try {
    const input = await request.json(); // Suponiendo que el input llega como JSON
    const result = await createResource(input);
    
    return new Response(JSON.stringify({ message: result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error en el endpoint de creación de recursos:', error);
    return new Response(JSON.stringify({ message: 'Ocurrió un error al procesar la solicitud.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET() {
    try {
        const resources = await getResources();
        return new Response(JSON.stringify(resources), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error en el endpoint de la obtención de recursos:', error);
        return new Response(JSON.stringify({message: 'Error al procesar la solicitud.'}), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}