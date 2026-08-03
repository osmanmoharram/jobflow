import type { Request, Response, NextFunction } from "express";
import Application from "../models/application.js";

export async function store(req: Request, res: Response, next: NextFunction) {
    try {
        const application = await Application.create({
            userId: req.user?.id,
            ...req.body,
        });

        res.status(201).json({ application });
    } catch (err) {
        next(err);
    }
}