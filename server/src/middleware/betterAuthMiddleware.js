import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth"; 

export async function betterAuthMiddleware(req, res, next) {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });

        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        req.user = session.user; 
        next(); 
    } catch (error) {
        console.error("Error in betterAuthMiddleware:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}