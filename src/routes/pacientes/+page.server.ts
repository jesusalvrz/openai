import { pacientes } from '$lib/server/schema';
import { db } from '$lib/server/db';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const nombre = formData.get('nombre') as string;
        const apellidos = formData.get('apellidos') as string;
        const edad = parseInt(formData.get('edad') as string);
        const telefono = formData.get('telefono') as string;

        if (!nombre || !apellidos || isNaN(edad) || !telefono ) {
            return {
                status: 400,
                error: ' Todos los campos son obligatorios'
            };
        }

        try {
            await db.insert(pacientes).values({
                nombre,
                apellidos,
                edad,
                telefono
            });

            return { succes: true };
        }catch (error) {
            console.error(error);
            return {
                status: 500,
                error: 'Error al insertar paciente en la base de datos'
            };
        }
    }
};