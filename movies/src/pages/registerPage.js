import React from "react";
import { useLocation } from "react-router-dom";
import RegisterForm from "../components/register";

const Register = (props) => {
  let location = useLocation();
  
  return (
      <RegisterForm />
  );
};

export default Register;