/*import type { Config } from 'drizzle-kit';
import { env } from '$env/static/private';

export default {
	schema: './src/lib/server/schema.ts',
	out: './drizzle',
	driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
	dbCredentials: {
		host: env.DB_HOST,
		user: env.DB_USER,
		password: env.DB_PASSWORD,
		database: env.DB_NAME
	}
} satisfies Config;*/

import type { Config } from 'drizzle-kit';
//import { env } from '$env/static/private';

export default {
    out: './drizzle',
    dialect: 'postgresql',
    schema: './src/lib/server/schema.ts',
    dbCredentials: {
        url: "postgres://default:Kt9wk0FxnflS@ep-bold-cloud-a471tjtl.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require"
    }
} satisfies Config;