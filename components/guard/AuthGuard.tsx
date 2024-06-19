import { Redirect } from "expo-router";
import React from "react";

export function AuthGuard(props: React.PropsWithChildren) {
  const [user] = React.useState(true);

  if (user) {
    return props.children;
  }

  return <Redirect href={"/login"} />;
}
