import { sqliteTable, int, index, text } from "drizzle-orm/sqlite-core";

export const recordsSchema = sqliteTable(
    "records",
    {
        id: int().primaryKey({ autoIncrement: true }),
        image: text().notNull(),
        bought_price: int().notNull(),
        sold_price: int().default(0),
    },
    (_table) => [],
);
