import { Router } from "express";
import authRoutes from "./auth.routes.js";
import applicationRoutes from "./application.routes.js";

const router = Router();

router.use("/api", [
    router.use("/auth", authRoutes),
    router.use("/applications", applicationRoutes),
]);

router.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
});

export default router;
