import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import * as schema from "./schema";
import { setupDb } from "./setup-db";
import { IExpenseInputData } from "@/utils/types";
import { expensesSchema } from "./schema";
import { eq } from "drizzle-orm";

export class ExpenseData {
    private db: ExpoSQLiteDatabase<typeof schema>;

    constructor() {
        this.db = setupDb();
    }

    // Get all expenses by record id
    async getAll(recordID: number) {
        const expenses = await this.db.query.expensesSchema.findMany({
            where: (expenseSchema, { eq }) =>
                eq(expenseSchema.record, recordID),
        });
        return expenses;
    }

    // Save expense
    async insert(data: IExpenseInputData[]) {
        const newRecord = await this.db.insert(expensesSchema).values(data);
        return newRecord;
    }

    // Update expense
    async update(id: number, changes: Partial<IExpenseInputData>) {
        const updatedRecord = await this.db
            .update(expensesSchema)
            .set(changes)
            .where(eq(expensesSchema.id, id));
        return updatedRecord;
    }

    // Remove expense
    async remove(id: number) {
        await this.db.delete(expensesSchema).where(eq(expensesSchema.id, id));
    }
}
