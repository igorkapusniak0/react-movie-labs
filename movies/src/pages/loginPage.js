import React from "react";
import { useLocation } from "react-router-dom";
import LoginForm from "../components/login";

const Login = (props) => {
  let location = useLocation();
  
  return (
    <LoginForm/>
  );
};

export default Login;