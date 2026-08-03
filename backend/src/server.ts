import { start } from "./bootstrap/app.js";

start().catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
});
