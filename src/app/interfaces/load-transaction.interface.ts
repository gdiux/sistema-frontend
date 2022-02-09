import { Transaction } from '../models/transaction.model';


export interface LoadTransactions{
    total: number;
    transactions: Transaction[];
}