import { Router } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth.js";

const authRouter = Router();

authRouter.all("/api/auth/{*any}", toNodeHandler(auth));

// authRouter.get('/api/auth/{*any}', (req, res) => {
//     res.send('Hello World!');
// });


export default authRouter;