import { Router } from "express";
import authRoutes from "./auth.routes.js";
import applicationRoutes from "./application.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/applications", applicationRoutes);

export default router;
