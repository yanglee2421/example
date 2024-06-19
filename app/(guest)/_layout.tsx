import { Slot } from "expo-router";
import { GuestGuard } from "@/components/guard/GuestGuard";

export default function GuestLayout() {
  return (
    <GuestGuard>
      <Slot />
    </GuestGuard>
  );
}
