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
      return <ForgotPasswordForm />;
  }
};

const Input = ({ onChange, name, ...rest }) => {
  return (
    <input
      {...rest}
      name={name}
      onChange={(e) => onChange(name, e.target.value)}
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 
          text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground 
          focus:border-ring focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-0 
          focus-visible:border-ring"
    />
  );
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
