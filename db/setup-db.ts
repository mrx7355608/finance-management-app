import * as Sqlite from "expo-sqlite";
import * as schema from "./schema";
import { drizzle, ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";

let cachedDb: ExpoSQLiteDatabase<typeof schema> | null = null;

export const setupDb = (): ExpoSQLiteDatabase<typeof schema> => {
    if (cachedDb) {
        return cachedDb;
    }
    const expo = Sqlite.openDatabaseSync("mydb.db");
    expo.execSync(
        "CREATE TABLE IF NOT EXISTS expenses (id integer PRIMARY KEY AUTOINCREMENT NOT NULL,item text NOT NULL,amount_spent integer NOT NULL,record_id integer,date text DEFAULT (CURRENT_DATE),FOREIGN KEY (`record_id`) REFERENCES `records`(`id`) ON UPDATE no action ON DELETE no action);",
    );
    expo.execSync(
        "CREATE INDEX IF NOT EXISTS record_idx ON expenses(record_id);",
    );
    expo.execSync(
        "CREATE TABLE IF NOT EXISTS records (id integer PRIMARY KEY AUTOINCREMENT NOT NULL, image text NOT NULL, bought_price INTEGER NOT NULL, sold_price INTEGER DEFAULT 0);",
    );

    const db = drizzle(expo, { schema });
    cachedDb = db;

    return db;
};
