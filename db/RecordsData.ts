import { ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import * as schema from "@/db/schema";
import { recordsSchema } from "./schema";
import { setupDb } from "./setup-db";
import { IRecordsInputData } from "@/utils/types";
import { eq } from "drizzle-orm";

export class RecordsData {
    private db: ExpoSQLiteDatabase<typeof schema>;

    constructor() {
        this.db = setupDb();
    }

    // Get all records
    async getAll() {
        const records = await this.db.query.recordsSchema.findMany();
        return records;
    }

    // Get one records
    async getOne(id: number) {
        const record = await this.db.query.recordsSchema.findFirst({
            where: (schema, { eq }) => eq(schema.id, id),
        });
        return record;
    }

    // Save record
    async insert(data: IRecordsInputData) {
        const newRecord = await this.db.insert(recordsSchema).values(data);
        return newRecord;
    }

    // Update record
    async update(id: number, changes: Partial<IRecordsInputData>) {
        const updatedRecord = await this.db
            .update(recordsSchema)
            .set(changes)
            .where(eq(recordsSchema.id, id));
        return updatedRecord;
    }

    // Remove record
    async remove(id: number) {
        await this.db.delete(recordsSchema).where(eq(recordsSchema.id, id));
    }
}
