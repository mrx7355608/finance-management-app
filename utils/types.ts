export interface IRecordsInputData {
    image: string;
    bought_price: number;
    sold_price: number;
}

export interface IRecord {
    id: number;
    bought_price: number;
    sold_price: number | null;
    image: string;
}

export interface IExpense {
    id: number;
    item: string;
    amount_spent: number;
    date: string | null;
    record: number;
}
export interface IExpenseInputData {
    item: string;
    amount_spent: number;
    record: number;
}

export interface IUpdateExpense extends Partial<IExpense> {
    edited?: boolean;
}
