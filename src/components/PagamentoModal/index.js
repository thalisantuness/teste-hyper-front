import { useState } from "react";
import { toast } from "react-toastify";
import { api } from "../../services/api";
import "./styles.css";

function PagamentoModal({ isOpen, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [cardData, setCardData] = useState({
    card_number: "",
    expiration_month: "",
    expiration_year: "",
    security_code: "",
    cardholder: { name: "" },
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "cardholder.name") {
      setCardData((prev) => ({
        ...prev,
        cardholder: { ...prev.cardholder, name: value },
      }));
    } else {
      setCardData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (
        !cardData.card_number ||
        !cardData.expiration_month ||
        !cardData.expiration_year ||
        !cardData.security_code ||
        !cardData.cardholder.name
      ) {
        toast.error("Preencha todos os campos");
        setLoading(false);
        return;
      }

      const response = await api.post("/assinaturas/com-cartao", {
        card_number: cardData.card_number,
        expiration_month: parseInt(cardData.expiration_month),
        expiration_year: parseInt(cardData.expiration_year),
        security_code: cardData.security_code,
        cardholder: {
          name: cardData.cardholder.name,
        },
      });

      toast.success("Assinatura realizada com sucesso!");
      onSuccess();
      onClose();

      setCardData({
        card_number: "",
        expiration_month: "",
        expiration_year: "",
        security_code: "",
        cardholder: { name: "" },
      });
    } catch (error) {
      console.error("❌ Erro:", error);
      toast.error(error.response?.data?.error || "Erro no pagamento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Nova Assinatura</h2>
        <p>Valor: R$ 97,00</p>

        <form onSubmit={handleSubmit}>
          <input
            name="card_number"
            placeholder="Número do cartão"
            value={cardData.card_number}
            onChange={handleChange}
            required
          />

          <div className="row">
            <input
              name="expiration_month"
              placeholder="Mês (MM)"
              value={cardData.expiration_month}
              onChange={handleChange}
              required
            />
            <input
              name="expiration_year"
              placeholder="Ano (YYYY)"
              value={cardData.expiration_year}
              onChange={handleChange}
              required
            />
          </div>

          <input
            name="security_code"
            placeholder="CVV"
            value={cardData.security_code}
            onChange={handleChange}
            required
          />

          <input
            name="cardholder.name"
            placeholder="Nome no cartão"
            value={cardData.cardholder.name}
            onChange={handleChange}
            required
          />

          <div className="modal-actions">
            <button type="button" onClick={onClose} disabled={loading}>
              Cancelar
            </button>
            <button type="submit" disabled={loading}>
              {loading ? "Processando..." : "Pagar R$ 97,00"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PagamentoModal;
