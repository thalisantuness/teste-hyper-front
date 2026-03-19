import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tokenSalvo = localStorage.getItem("@App:token");
    const userSalvo = localStorage.getItem("@App:user");
    
    if (tokenSalvo && userSalvo) {
      setToken(tokenSalvo);
      setUser(JSON.parse(userSalvo));
    }
    setLoading(false);
  }, []);

  const login = (userData, tokenData) => {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem("@App:token", tokenData);
    localStorage.setItem("@App:user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("@App:token");
    localStorage.removeItem("@App:user");
  };

  const isAdmin = () => user?.role === "admin";
  const isEmpresa = () => user?.role === "empresa";

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      logout,
      isAdmin,
      isEmpresa
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};