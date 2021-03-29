import Modal from "react-modal";
import { Container } from "./styles";
import closImg from "../../assets/close.svg";

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({
    isOpen,
    onRequestClose,
}: NewTransactionModalProps) {
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
            <Container>
                <h2>Cadastrar transacação</h2>
                <input placeholder="Título" />
                <input placeholder="Valor" type="number" />
                <input placeholder="Categoria" />
                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    );
}
