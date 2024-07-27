import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations.js";
import { db } from "./db";
import type React from "react";

export function DatabaseSuspense(props: Props) {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    console.log(error);
    return props.fallback;
  }

  if (success) {
    return props.children;
  }

  return props.fallback;
}

type Props = {
  fallback?: React.ReactNode;
  children?: React.ReactNode;
};
