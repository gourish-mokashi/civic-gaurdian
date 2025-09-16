import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

const authClient = createAuthClient({
    baseURL: `http://${process.env.EXPO_PUBLIC_IP_ADDRESS}:3000`,
    plugins: [
        expoClient({
            scheme: "civic-guardian",
            storagePrefix: "civic-storage",
            storage: SecureStore,
        })
    ]
});

export default authClient;