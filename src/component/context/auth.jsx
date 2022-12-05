import axios from "axios";
import React, { createContext, useState } from "react";
import { getItem, removeItem, setItem } from "../services/localStorage";
// import jwt_decode from "jwt-decode";
import { Navigate, NavigationType, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUserAuth] = useState(false);
  const [count, setCount] = useState(0);
  const [token , setToken] = useState([])

  // Login updates the user data with a name parameter
  const url = `http://127.0.0.1:8000/api/login_check`;

  function login(username, password) {
   

      axios.post(url, { username: username, password: password })
      .then((response) => response.data.token)
      .then((token) => {
      setItem("login",token)
        setUserAuth(true)
        setToken(token)
      }
      )
  }

  function handleCount() {
    setCount(count + 1);
  }

  function hasAuthenticated() {
    const token = getItem("login");
    const isValid = token ? tokenIsValid(token) : false;

    if (isValid === false) {
      removeItem("login");
    } else {
      // return isValid
      console.log("test");
    }
  }

  function tokenIsValid(token) {
    const exp = jwt_decode(token);

    if (exp * 1000 > new Date().getTime()) {
      return true;
    }

    return false;
  }
  // Logout updates the user data to default
  function logout() {
    setUserAuth(false);
    removeItem("login");
  }

  // function getAuth(){
  //  const token= window.localStorage.getItem('login')
  //  const decode = jwtDecode(token)
  //  console.log(decode)
  // }

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        hasAuthenticated,
        tokenIsValid,
        setUserAuth,
        handleCount,
        count,
        setCount,
        token,
        setToken,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
