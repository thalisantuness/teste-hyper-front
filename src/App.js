import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./global.css";

import Login from "./pages/login/index";
import Transacoes from "./pages/transacoes/index";

function PrivateRoute({ children }) {
  const { token, isAdmin, isEmpresa, loading } = useAuth();
  
  if (loading) return null;
  
  if (!token) return <Navigate to="/" />;
  
  if (!isAdmin() && !isEmpresa()) return <Navigate to="/" />;
  
  return children;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
            path="/transacoes" 
            element={
              <PrivateRoute>
                <Transacoes />
              </PrivateRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;