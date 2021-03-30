import Modal from "react-modal";
import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import closImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import React, { FormEvent, useState } from "react";
import { useTransactions } from "../hooks/useTransactions";

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({
    isOpen,
    onRequestClose,
}: NewTransactionModalProps) {
    const { createTransaction } = useTransactions();
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState("");
    const [type, setType] = useState<"deposit" | "withdraw">("deposit");

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({ title, amount, type, category });

        clearFields();
        onRequestClose();
    }

    function clearFields() {
        setTitle("");
        setAmount(0);
        setCategory("");
        setType("deposit");
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button type="button">
                <img
                    src={closImg}
                    alt="Fechar modal"
                    className="react-modal-close"
                    onClick={onRequestClose}
                />
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transacação</h2>
                <input
                    placeholder="Título"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <input
                    placeholder="Valor"
                    type="number"
                    value={amount}
                    onChange={(event) => setAmount(Number(event.target.value))}
                />
                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        onClick={() => setType("deposit")}
                        isActive={type === "deposit"}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type="button"
                        onClick={() => setType("withdraw")}
                        isActive={type === "withdraw"}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>
                <input
                    placeholder="Categoria"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                />
                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    );
}
