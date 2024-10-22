import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Puedes exportar tus variables de entorno aquí si es necesario
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
