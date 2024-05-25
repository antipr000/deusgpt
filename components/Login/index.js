"use client";

import React, { useState } from "react";
import styles from "./Login.module.css";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

const Form = ({ tab, setTab }) => {
  switch (tab) {
    case "login":
      return <LoginForm setTab={setTab} />;
    case "register":
      return <RegistrationForm />;
    case "forgot_password":
      return <ForgotPasswordForm setTab={setTab} />;
  }
};

const Login = () => {
  const [tab, setTab] = useState("login");

  return (
    <div
      className="bg-white h-[520px] p-6 shadow-lg border-2 w-full max-w-[450px] 
      mt-[24px]"
    >
      <div className="flex w-full flex-col justify-center space-y-6 h-96">
        <div className="tab">
          <button
            className="tablink"
            onClick={() => setTab("login")}
            id="defaultOpen"
          >
            Login
          </button>
          <button
            className={`tablink ${styles.register_tab}`}
            onClick={() => setTab("register")}
          >
            Register
          </button>
        </div>
        <Form tab={tab} setTab={setTab} />
      </div>
    </div>
  );
};

export default Login;
