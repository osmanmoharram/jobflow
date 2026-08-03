import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import { env } from "../config/env.js";
import jwt from "jsonwebtoken";
import { signToken } from "../utils/token.js";

export const register = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(409).json({
            errors: { email: ["Email already registered!"] },
        });
        return;
    }

    const passwordHash = await bcrypt.hash(password, env.HASH_SALT_ROUNDS);

    const user = await User.create({
        name,
        email,
        password: passwordHash,
    });

    res.status(201).json({
        token: signToken(user.id),
        user: { id: user.id, name: user.name, email: user.email },
    });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401).json({
            errors: {
                credentials: ["Invalid name or password"],
            },
        });
        return;
    }

    res.status(201).json({
        token: signToken(user.id),
        user: { id: user.id, name: user.name, email: user.email },
    });
});
