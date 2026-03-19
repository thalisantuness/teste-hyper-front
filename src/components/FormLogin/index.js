import { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../services/api";
import "./styles.css";

function FormLogin() {
  const [form, setForm] = useState({ email: "", senha: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await auth.login(form);
      const { usuario, token } = response.data;
      
      if (usuario.role !== "admin" && usuario.role !== "empresa") {
        toast.error("Acesso negado.");
        setLoading(false);
        return;
      }

      login(usuario, token);
      toast.success("Login realizado!");
      
      window.location.href = "/transacoes";
      
    } catch (error) {
      const msg = error.response?.data?.error || "Erro no login";
      toast.error(msg);
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <p>Acesse sua conta</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={form.senha}
            onChange={handleChange}
            required
          />
          
          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormLogin;