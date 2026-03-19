import React from "react";
import { useAuth } from "../../context/AuthContext";
import "./styles.css";

function SideBar() {
  const { user, logout } = useAuth();

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>Pagamentos </h2>
      </div>
      
      <div className="sidebar-user">
        <p className="user-name">{user?.nome}</p>
        <p className="user-role">{user?.role === 'admin' ? 'Administrador' : 'Empresa'}</p>
      </div>
      
      <nav className="sidebar-nav">
        <a href="/transacoes" className="active">
          <span>📊</span> Transações
        </a>
      </nav>
      
      <button onClick={logout} className="sidebar-logout">
        <span>🚪</span> Sair
      </button>
    </div>
  );
}

export default SideBar;