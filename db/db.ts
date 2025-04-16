import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import * as schema from "@/db/schema";
import * as consts from "@/lib/constants";

export const db = drizzle(
  openDatabaseSync(consts.databaseName, { enableChangeListener: true }),
  { schema },
);
