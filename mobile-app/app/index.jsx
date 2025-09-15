import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Check if router is ready before redirecting
    const timer = setTimeout(() => {
      router.replace("/SignIn");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null;
}