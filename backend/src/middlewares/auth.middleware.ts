import { Request, Response, NextFunction } from "express";
import z from "zod";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;

    if (!header?.startsWith("Bearer ")) {
        res.status(401).json("Not authenticated");
        return;
    }

    const parsed = z.jwt().safeParse(header.slice(7));

    if (!parsed.success) {
        res.status(401).json({ error: "Invalid token" });
        return;
    }

    const token = parsed.data;

    try {
        const payload = jwt.verify(token, env.JWT_SECRET);

        if (typeof payload === "string" || !payload.sub) {
            res.status(401).json({ error: "Invalid token" });
            return;
        }

        req.user = {
            id: payload.sub
        }

        next();
    } catch (error) {
        res.status(401).json("Invalid or expired token");
    }
}
