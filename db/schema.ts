import { relations, sql } from "drizzle-orm";
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

export const expensesSchema = sqliteTable(
    "expenses",
    {
        id: int().primaryKey({ autoIncrement: true }),
        item: text().notNull(),
        amount_spent: int().notNull(),
        record: int("record_id").references(() => recordsSchema.id),
        date: text().default(sql`(CURRENT_DATE)`),
    },
    (table) => [index("record_idx").on(table.record)],
);
