import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { transacoes } from "../../services/api";
import PagamentoModal from "../PagamentoModal";
import "./styles.css";

function TransacoesList() {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { isAdmin, isEmpresa } = useAuth();

  useEffect(() => {
    carregarTransacoes();
  }, []);

  const carregarTransacoes = async () => {
    try {
      setLoading(true);
      const response = await transacoes.listar(isAdmin());
      
      console.log("Resposta da API:", response.data);
      
      // ✅ CORREÇÃO: Pega as rows de dentro do objeto transacoes
      if (response.data?.transacoes?.rows) {
        setLista(response.data.transacoes.rows);
      } else {
        setLista([]);
      }
      
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Erro ao carregar transações");
      setLista([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Carregando...</div>;

  return (
    <div className="transacoes-container">
      <div className="header">
        <h1>Transações</h1>
        {isEmpresa() && (
          <button onClick={() => setModalOpen(true)} className="btn-primary">
            Nova Assinatura
          </button>
        )}
      </div>

      <div className="transacoes-grid">
        {lista.length === 0 ? (
          <p className="empty">Nenhuma transação encontrada</p>
        ) : (
          lista.map((item) => (
            <div key={item.transacao_id} className="transacao-card">
              <div className={`status ${item.status}`}>
                {item.status === 'aprovada' ? '✅ Aprovada' : item.status}
              </div>
              <div className="valor">
                R$ {Number(item.valor).toFixed(2)}
              </div>
              <div className="data">
                {new Date(item.createdAt).toLocaleDateString('pt-BR')}
              </div>
              {isAdmin() && (
                <div className="usuario">
                  Usuário: {item.usuario_id?.substring(0, 8)}...
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <PagamentoModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={carregarTransacoes}
      />
    </div>
  );
}

export default TransacoesList;