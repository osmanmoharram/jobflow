import { connect } from "mongoose";
import { env } from "./env.js";

export async function connectDB() {
    await connect(
        `${env.MONGO_URI.replace(/\/$/, "")}:${env.MONGO_PORT}/${env.MONGO_DB}`,
    );
}
