import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import app from "./app.js";

async function start() {
    await connectDB();
    app.listen(env.SERVER_PORT, () =>
        console.log(`Listening on port ${env.SERVER_PORT}`),
    );
}

start().catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
});
