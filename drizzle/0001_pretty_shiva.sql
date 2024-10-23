CREATE TABLE IF NOT EXISTS "pacientes" (
	"id" serial PRIMARY KEY NOT NULL,
	"nombre" text NOT NULL,
	"apellidos" text NOT NULL,
	"edad" integer NOT NULL,
	"telefono" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
