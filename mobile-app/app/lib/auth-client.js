import { createAuthClient } from "better-auth/react";
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

const authClient = createAuthClient({
    baseURL: "http://192.168.35.243:3000", // Base URL of your Better Auth backend.
    plugins: [
        expoClient({
            scheme: "civic-guardian",
            storagePrefix: "civic-storage",
            storage: SecureStore,
        })
    ]
});

export default authClient;