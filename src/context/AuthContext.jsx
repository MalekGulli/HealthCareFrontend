import { createContext, useState } from "react";
// authentication context to handle global auth
export const AuthContext = createContext();

// Helena: la till userId här
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    roles: [],
    userId: "",
  });

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
