export type QuantityMap = {
    [key: string]: number;
};
export type StringMap = {
    [key: string]: string;
};
export type IndividualBreakup = {
    name: string;
    payable: number;
};
export type UserObject = {
    name: string;
    id: string;
    _id: string;
    vpa?: string;
    password?: string;
};
export type PaymentTxObject = {
    _id: string;
    creator: string;
    title: string;
    date: string;
    payable: number;
    vpa: '';
};

export enum NewExpenseType {
    'bulk',
    'single',
}
export type NewExpenseObject = {
    type: NewExpenseType;
    creator: string;
    title: string;
    date: string;
    cost: number;
    paid: Array<string>;
    breakup: Array<IndividualBreakup>;
};
export type ExpenseHistoryObject = {
    expenseId: number;
    creator: string;
    title: string;
    cost: number;
    type: string;
    date: string;
    paid: boolean;
    breakup: Array<{ name: string; payable: number }>;
};
export type PaymentHistoryObject = {
    _id: string;
    creator: string;
    title: string;
    date: string;
    payable: number;
};
