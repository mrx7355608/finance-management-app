import { IRecord, IExpense } from "./types";

const sum = (total: number, expense: IExpense) => {
    return total + expense.amount_spent;
};

export const calculateProfit = (expenses: IExpense[], record: IRecord) => {
    let totalExpenses = 0;

    if (expenses.length > 0) {
        totalExpenses = expenses.reduce(sum, 0);
    }

    const totalAmountSpent = totalExpenses + record.bought_price;
    const soldAmount = record.sold_price || 0;
    const profit = soldAmount - totalAmountSpent;
    return profit;
};

export const calculateTotalExpense = (
    expenses: IExpense[],
    record: IRecord,
) => {
    let totalExpenses = 0;

    if (expenses.length > 0) {
        totalExpenses = expenses.reduce(sum, 0);
    }
    const totalAmountSpent = totalExpenses + record.bought_price;
    return totalAmountSpent;
};
