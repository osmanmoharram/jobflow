import type { Request, Response, NextFunction } from "express";
import Application from "../models/application.js";

export async function index(req: Request, res: Response, next: NextFunction) {
    try {
        const applications = await Application.find({ userId: req.user?.id });

        res.status(200).json({ applications });
    } catch (error) {
        next(error);
    }
}

export async function store(req: Request, res: Response, next: NextFunction) {
    try {
        const application = await Application.create({
            userId: req.user?.id,
            ...req.body,
        });

        res.status(201).json({ application });
    } catch (error) {
        next(error);
    }
}

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const updated = await Application.updateOne({ _id: req.params.application }, req.body);

        res.json({
            message: updated.acknowledged
                ? "Application updated successfully"
                : "Application was not updated! try again",
        });
    } catch (error) {
        next(error);
    }
}

export async function destroy(req: Request, res: Response, next: NextFunction) {
    try {
        const deleted = await Application.deleteOne({ _id: req.params.application });

        res.status(200).json({
            message: deleted.acknowledged
                ? "Application deleted successfully"
                : "Application was not deleted! try again",
        });
    } catch (err) {
        next(err);
    }
}