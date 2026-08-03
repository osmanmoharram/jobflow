import { model, Schema } from "mongoose";

export const APPLICATION_STATUSES = [
    "wishlist",
    "applied",
    "screening",
    "interview",
    "offer",
    "rejected",
] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const WORK_MODES = ["remote", "hybrid", "onsite"] as const;
export type WorkMode = (typeof WORK_MODES)[number];

export interface IApplication {
    userId: string;
    company: string;
    role: string;
    status: ApplicationStatus;
    jobUrl?: string;
    source?: string;
    location?: string;
    workMode?: WorkMode;
    salaryRange?: string;
    appliedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>(
    {
        userId: {
            type: String,
            ref: "User",
            required: true,
        },
        company: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: [...APPLICATION_STATUSES],
            default: "wishlist",
        },
        jobUrl: {
            type: String,
            required: false,
        },
        source: {
            type: String,
            required: false,
        },
        location: {
            type: String,
            required: false,
        },
        workMode: {
            type: String,
            required: false,
            enum: [...WORK_MODES],
        },
        salaryRange: {
            type: String,
            required: false,
        },
        appliedAt: {
            type: Date,
            required: false,
        },
    },
    { timestamps: true },
);

export default model("Application", applicationSchema);
