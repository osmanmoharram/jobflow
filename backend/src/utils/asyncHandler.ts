import type { Request, Response, NextFunction } from "express";

type AsyncFn = (req: Request, res: Response) => Promise<unknown>;

export const asyncHandler = (fn: AsyncFn) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res).catch(next);
    };
};
