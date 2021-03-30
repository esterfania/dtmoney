import React, { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "./services/api";

interface TransactionsContextData {
    transactions: Transaction[];
}

interface TransactionsProviderProps {
    children: ReactNode;
}

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: "deposit" | "withdraw";
    category: string;
    createdAt: Date;
}

export const TransactionsContext = createContext({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        api.get("transactions").then((res) => {
            setTransactions(res.data.transactions);
        });
    }, []);

    return (
        <TransactionsContext.Provider value={{ transactions }}>
            {children}
        </TransactionsContext.Provider>
    );
}
