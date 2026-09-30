import 'dotenv/config';
import {z} from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  DATABASE_URL: z.url(),
  ADMIN_EMAIL: z.preprocess((value) => value || undefined, z.email().optional()),
  ADMIN_PASSWORD: z.string().optional(),
  ADMIN_SESSION_SECRET: z.string().optional(),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error('Invalid environment configuration:', result.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = result.data;
