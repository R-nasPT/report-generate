/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(""); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  // console.log(isAdmin);

  const login = (adminStatus) => {
    setIsAdmin(adminStatus);
    setIsLoggedIn(true);
  };

  const logout = useCallback(() => {
    setIsAdmin("");
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    navigate("/");
  });

  const formatDate = (datestring) => {
    // console.log(datestring);
    if (datestring) {
      const createDate = new Date(datestring);
      const date = `${("0" + createDate.getDate()).slice(-2)}`;
      const month = `${("0" + (createDate.getMonth() + 1)).slice(-2)}`;
      const year = `${createDate.getFullYear()}`;
      const formattedDate = `${date}/${month}/${year}`;
      return formattedDate;
    } else {
      return datestring;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      // console.log(decodedToken);
      if (decodedToken.exp * 1000 > Date.now()) {
        login(decodedToken.isAdmin); // Set the login status and role
      } else {
        // Token has expired, perform logout or refresh token
        logout();
      }
    }
  }, [logout]);

  return (
    <AuthContext.Provider value={{ isAdmin, isLoggedIn, login, logout, formatDate }}>
      {children}
    </AuthContext.Provider>
  );
}
