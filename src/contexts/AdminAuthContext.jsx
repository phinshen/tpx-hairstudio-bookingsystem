import { createContext, useContext, useState, useEffect } from "react";

const AdminAuthContext = createContext();

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}

export function AdminAuthProvider({ children }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "admin123456";

  useEffect(() => {
    // Check if admin is already logged in (stored in memory for this session)
    const adminSession = sessionStorage.getItem("adminAuthenticated");
    if (adminSession === "true") {
      setIsAdminAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = (username, password) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem("adminAuthenticated", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem("adminAuthenticated");
  };

  const value = {
    isAdminAuthenticated,
    isLoading,
    login,
    logout,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}
