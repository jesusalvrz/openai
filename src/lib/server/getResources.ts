import { db } from './db';
import { embeddings } from './schema';

export const getResources = async () => {
    try {
        const resources = await db.select().from(embeddings);
        return resources;
    } catch (error) {
        console.error("Error al obtener los recursos", error);
        throw new Error('No se pudieron obtener los recursos');
    }
}