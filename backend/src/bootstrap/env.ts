import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z
        .enum(["local", "test", "production"])
        .default("local"),
    SERVER_PORT: z.coerce.number().int().positive().default(3000),
    MONGO_URI: z.string().min(1, "MONGO_URI is required"),
    MONGO_PORT: z.coerce.number().int().positive().default(27017),
    MONGO_DB: z.string().min(3, "MONGO_DB is required"),
    JWT_SECRET: z.string().min(16, "JWT_SECRET must be at least 16 characters"),
    JWT_EXPIRES_IN: z.string().default("7d"),
    CORS_ORIGIN: z.string().default("http://localhost:5173"),
    HASH_SALT_ROUNDS: z.coerce.number().int().positive().default(12)
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error("❌ Invalid environment variables:\n");
    console.log(z.prettifyError(parsed.error));
    process.exit(1);
}

export const env = parsed.data;
export type Env = typeof env;
