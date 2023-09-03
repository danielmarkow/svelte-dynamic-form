import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

import { POSTGRES_URL } from '$env/static/private';

const queryClient = postgres(POSTGRES_URL + '?sslmode=require');

export const db: PostgresJsDatabase = drizzle(queryClient);
