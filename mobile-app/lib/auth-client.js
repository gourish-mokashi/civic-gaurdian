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


export const fetchWithAuth = async (url, options = {}) => {
  const stored = await SecureStore.getItemAsync("authToken");
  console.log(stored);
  if (!stored) throw new Error("Not logged in");

  const token = stored;

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, // attach token
    },
  });

  if (!res.ok) {
    throw new Error("Request failed with " + res.status);
  }

  return res.json();
};

export default authClient;