import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import * as schema from "@/db/schema";

export const db = drizzle(openDatabaseSync("db.sqlite"), { schema });
