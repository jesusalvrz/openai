/*

TABLA DEL TUTORIAL

import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/node-postgres';

export const usersTable = pgTable('users', {
    id: serial('id').primaryKey(),
    fullName: text('full_name'),
    phone: varchar('phone', { length: 255 })
});*/

import { sql } from "drizzle-orm";
import { text, varchar, serial, integer, timestamp, pgTable, vector, index } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { nanoid } from "../utils";

// Tabla para pacientes
export const pacientes = pgTable('pacientes', {
  id: serial('id').primaryKey(),
  nombre: text('nombre').notNull(),
  apellidos: text('apellidos').notNull(),
  edad: integer('edad').notNull(),
  telefono: varchar('telefono', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const pacientesSchema = createSelectSchema(pacientes, {
  id: z.number().int(),
  nombre: z.string(),
  apellidos: z.string(),
  edad: z.number().int().min(0).max(120),
  telefono: z.string().min(10).max(255)
})

// Tabla para notas
/*export const notas = pgTable('notas', {
  id: serial('id').primaryKey(),
  idPaciente: integer('idPaciente')
    .notNull()
    .references(() => pacientes.id), // Clave foránea que referencia la tabla pacientes
  nota: text('nota').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const notasIndex = index('notas_idPaciente_idx').on(notas.idPaciente);

// Esquema de validación para notas
export const notasSchema = createSelectSchema(notas, {
  id: z.number().int(),
  idPaciente: z.number().int(),
  nota: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date()
});
*/

export const notas = pgTable('notas', {
  id: serial('id').primaryKey(),
  uidPaciente: varchar('uidPaciente', { length: 255 }).notNull(),
  nota: text('nota').notNull(),
  embedding: text('embedding'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});

export const notasIndex = index('notas_uidPaciente_idx').on(notas.uidPaciente);

export const notasSchema = createSelectSchema(notas, {
  id: z.number().int(),
  uidPaciente: z.string().min(1),
  nota: z.string().min(1),
  embedding: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
})

// Table definition for resources
export const resources = pgTable("resources", {
  id: varchar("id", { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  content: text("content").notNull(),

  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

// Schema for resources - used to validate API requests
export const insertResourceSchema = createSelectSchema(resources)
  .extend({})
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

// Type for resources - used to type API request params and within Components
export type NewResourceParams = z.infer<typeof insertResourceSchema>;

// Table definition for embeddings
export const embeddings = pgTable(
  "embeddings",
  {
    id: varchar("id", { length: 191 })
      .primaryKey()
      .$defaultFn(() => nanoid()),
    resourceId: varchar("resource_id", { length: 191 }).references(
      () => resources.id,
      { onDelete: "cascade" }
    ),
    content: text("content").notNull(),
    embedding: vector("embedding", { dimensions: 1536 }).notNull(),
  },
  (table) => ({
    embeddingIndex: index("embeddingIndex").using(
      "hnsw",
      table.embedding.op("vector_cosine_ops")
    ),
  })
);
