import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { openDatabaseSync } from "expo-sqlite/next";
import React from "react";
import { Text } from "react-native";
import * as schema from "@/db/schema";
import migrations from "@/drizzle/migrations.js";

const expoDb = openDatabaseSync("db.db");
export const db = drizzle(expoDb, { schema });

export function DatabaseSuspense(props: React.PropsWithChildren) {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return <Text>{error.message}</Text>;
  }

  if (success) {
    return props.children;
  }

  return <Text>database loading...</Text>;
}
