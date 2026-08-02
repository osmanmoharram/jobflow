import { z } from "zod";

const baseSchema = z.object({
    name: z.string().min(3),
    email: z.email(),
    password: z.string().min(4),
    confirmPassword: z.string(),
});

export const registerSchema = baseSchema.refine(
    (data) => data.password === data.confirmPassword,
    {
        message: "Passwords do not match",
        path: ["confirmPassword"],
        when(payload) {
            return baseSchema
                .pick({ password: true, confirmPassword: true })
                .safeParse(payload.value).success;
        },
    },
);

export const loginSchema = baseSchema.pick({ email: true, password: true });
