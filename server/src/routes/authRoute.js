import { Router } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth.js";

const authRouter = Router();

authRouter.all("/api/auth/{*any}", toNodeHandler(auth));

export default authRouter;