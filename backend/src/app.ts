import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import routes from "./routes/index.js";

const app = express();

app.use(cors({ origin: env.CORS_ORIGIN }));

app.use(express.json());

// setting up routes
app.use("/api", routes);

app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
});

// errors handler

export default app;
