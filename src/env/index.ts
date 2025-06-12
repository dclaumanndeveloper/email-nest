import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'prod']),
  PORT: z.coerce.number(),
  AUTH_SECRET: z.string(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('Invalid environment variables:');
  console.log(JSON.stringify(_env.error.flatten().fieldErrors, null, 2));
  process.exit(1);
}

export const env = _env.data;
