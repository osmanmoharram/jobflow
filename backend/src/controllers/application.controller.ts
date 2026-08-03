import type { Request, Response, NextFunction } from "express";
import Application from "../models/application.js";

export async function index(req: Request, res: Response, next: NextFunction) {
    try {
        const applications = await Application.find({ userId: req.user?.id });

        res.status(200).json({ applications });
    } catch (err) {
        next(err);
    }
}

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
