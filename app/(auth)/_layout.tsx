import { Slot } from "expo-router";
import { AuthGuard } from "@/components/guard/AuthGuard";

export default function AuthLayout() {
  return (
    <AuthGuard>
      <Slot />
    </AuthGuard>
  );
}
