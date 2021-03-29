import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Container } from "./styles";

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: Date;
}

export function TransactionTable() {
    useEffect(() => {
        api.get("transactions").then((res) => {
            setTransactions(res.data);
        });
    }, []);

    const [transactions, setTransactions] = useState([]);

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction: Transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.title}</td>
                            <td className="deposit">{transaction.amount}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.createdAt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    );
}
