import React from "react";
import SideBar from "../../components/SideBar";
import TransacoesList from "../../components/TransacoesList";
import "./styles.css";

function TransacoesPage() {
  return (
    <div className="transacoes-page">
      <SideBar />
      <div className="main-content">
        <TransacoesList />
      </div>
    </div>
  );
}

export default TransacoesPage;