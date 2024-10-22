import dotenv from 'dotenv';
import { embed, embedMany } from 'ai';
import { db } from '../server/db';
import { cosineDistance, desc, gt, sql } from 'drizzle-orm';
import { embeddings } from '../server/schema';
import { createOpenAI } from "@ai-sdk/openai"

dotenv.config();
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const openai = createOpenAI({ apiKey})

const embeddingModel = openai.embedding('text-embedding-ada-002');

const generateChunks = (input: string): string[] => {
  return input
    .trim()
    .split('.')
    .filter(i => i !== '');
};

export const generateEmbeddings = async (
  value: string,
): Promise<Array<{ embedding: number[]; content: string }>> => {
  const chunks = generateChunks(value);
  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: chunks,
  });
  return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));
};

export const generateEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll('\\n', ' ');
  const { embedding } = await embed({
    model: embeddingModel,
    value: input,
  });
  return embedding;
};

export const findRelevantContent = async (userQuery: string) => {
  const userQueryEmbedded = await generateEmbedding(userQuery);
  const similarity = sql<number>`1 - (${cosineDistance(
    embeddings.embedding,
    userQueryEmbedded,
  )})`;

  // Utilizamos 'similarity' directamente como expresión SQL
  const similarGuides = await db
    .select({ name: embeddings.content, similarity })  // Seleccionamos 'similarity'
    .from(embeddings)
    .where(gt(similarity, 0.5))
    .orderBy(() => desc(similarity))  // Usamos 'similarity' como expresión SQL
    .limit(4);

  return similarGuides;
};
