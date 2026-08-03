import jwt from "jsonwebtoken";
import { env } from "../bootstrap/env.js";

export function signToken(userId: string): string {
    return jwt.sign({ sub: userId }, env.JWT_SECRET, {
        expiresIn: "7d" as jwt.SignOptions["expiresIn"],
    });
}
