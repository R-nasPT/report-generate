/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
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
      if (!isNaN(createDate)) {
        const date = `${("0" + createDate.getDate()).slice(-2)}`;
        const month = `${("0" + (createDate.getMonth() + 1)).slice(-2)}`;
        const year = `${createDate.getFullYear()}`;
        const formattedDate = `${date}/${month}/${year}`;
        return formattedDate;
      }
    } else {
      return datestring;
    }
  };

  const formatDateTime = (dateString) => {
    if (dateString) {
      const createDate = new Date(dateString);
      if (!isNaN(createDate)) {
        const date = `${("0" + createDate.getDate()).slice(-2)}`;
        const month = `${("0" + (createDate.getMonth() + 1)).slice(-2)}`;
        const year = `${createDate.getFullYear()}`;
        const hour = `${("0" + createDate.getHours()).slice(-2)}`;
        const minute = `${("0" + createDate.getMinutes()).slice(-2)}`;

        const formattedDate = `${date}/${month}/${year}, ${hour}:${minute}`;
        return formattedDate;
      }
    }
    return null;
  };

  const timeMinusSeven = (time) => {
      const date = new Date(time);
      date.setHours(date.getHours() - 7);
      // console.log(date);
      return date.toISOString()
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
    <AuthContext.Provider
      value={{
        isAdmin,
        isLoggedIn,
        login,
        logout,
        formatDate,
        formatDateTime,
        timeMinusSeven,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
