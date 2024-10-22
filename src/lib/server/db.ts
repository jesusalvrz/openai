import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL || 'postgres://default:Kt9wk0FxnflS@ep-bold-cloud-a471tjtl-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require';

const client = postgres(connectionString);
export const db = drizzle(client);
