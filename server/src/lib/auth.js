import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../../generated/prisma/index.js";
import { expo } from "@better-auth/expo";

const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    plugins: [expo()],
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields:{
            phoneNumber: { type: "string", required: false },
            address: { type: "string", required: false },
            pincode: { type: "string", required: false },
        },
    },
    trustedOrigins: ["http://localhost:8081", "civic-guardian://", "http://localhost:5173"],
    secret: process.env.AUTH_SECRET,
    baseURL: process.env.AUTH_BASE_URL,
});