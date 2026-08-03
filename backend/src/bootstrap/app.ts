import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import { env } from "./env.js";
import routes from "../routes/index.js";

const app = express();

app.use(cors({ origin: env.CORS_ORIGIN }));

app.use(express.json());

app.use(routes);

// errors handler

export async function start() {
    await connectDB();
    app.listen(env.SERVER_PORT, () => console.log(`Listening on port ${env.SERVER_PORT}`));
}

export default app;