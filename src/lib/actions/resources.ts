'use server';

import type { NewResourceParams } from '../server/schema';
import {
  insertResourceSchema,
  resources,
} from '../server/schema';
import { db } from '../server/db';
import { generateEmbeddings } from '../ai/embeddings';
import { embeddings as embeddingsTable } from '../server/schema';

export const createResource = async (input: NewResourceParams) => {
  try {
    const { content } = insertResourceSchema.parse(input);
    
    console.log('Contenido recibido:', content); // Log para verificar el input

    const [resource] = await db
      .insert(resources)
      .values({ content })
      .returning();

    console.log('Recurso insertado:', resource); // Log para verificar que se inserta el recurso

    const embeddings = await generateEmbeddings(content);
    console.log('Embeddings generados:', embeddings); // Log para verificar los embeddings

    await db.insert(embeddingsTable).values(
      embeddings.map(embedding => ({
        resourceId: resource.id,
        ...embedding,
      })),
    );

    console.log('Embeddings insertados en la BD'); // Log para verificar la inserción
    return 'Resource successfully created and embedded.';
  } catch (error) {
    console.error('Error en createResource:', error); // Log del error
    return error instanceof Error && error.message.length > 0
      ? error.message
      : 'Error, please try again.';
  }
};
