import { Link } from "expo-router";
import { View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Link href="/SignIn">Sign In</Link>
      <Link href="/Profile">Profile</Link>
      <Link href="/Posts">Posts</Link>
    </View>
  );
}