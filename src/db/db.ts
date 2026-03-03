import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import * as schema from "@/db/schema";
import * as consts from "@/lib/constants";

const expoDb = openDatabaseSync(consts.databaseName, {
  // useLiveQuery need this option to be set to true
  enableChangeListener: true,
});

export const db = drizzle(expoDb, { schema });
