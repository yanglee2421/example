import { Redirect } from "expo-router";
import React from "react";

export function GuestGuard(props: React.PropsWithChildren) {
  const user = false;

  if (user) {
    return <Redirect href={"/home"} />;
  }

  return props.children;
}
