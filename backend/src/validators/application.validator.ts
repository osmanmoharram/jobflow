import z from "zod";
import { APPLICATION_STATUSES, WORK_MODES } from "../models/application.js";

const baseSchema = z.object({
    company: z.string().min(3, "Company field is required"),
    role: z.string().min(3, "Role field is required"),
    status: z.enum([...APPLICATION_STATUSES]),
    jobUrl: z.url("Must be a valid url").optional(),
    source: z.string().max(100).optional(),
    location: z.string().max(200).optional(),
    workMode: z.enum([...WORK_MODES]).optional(),
    salaryRange: z.string().max(100).optional(),
    appliedAt: z.iso.datetime({ local: true }).optional(),
});

export const createApplicationSchema = baseSchema.extend({
    status: z.enum([...APPLICATION_STATUSES]).default("wishlist"),
});

export const updateApplicationSchema = baseSchema.partial();
