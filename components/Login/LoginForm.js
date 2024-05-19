"use client";

import { useState } from "react";
import {
  loginWithEmail,
  loginWithGithub,
  loginWithGoogle,
} from "../../firebase/utils";
import styles from "./Login.module.css";

const LoginForm = ({ setTab }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const onChange = (event) => {
    setLoginData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const { email, password } = loginData;

    if (!email || !password) {
      window.alert("Both email and password is mandatory to login!");
    } else {
      await loginWithEmail(email, password);
    }
  };

  return (
    <div id="login" className={`tabcontent ${styles.login_form_container}`}>
      <div className="flex flex-col space-y-2 text-center">
        <div className="inline-block transition duration-200 ease-in-out text-content-emphasis font-medium">
          Log in into your account
        </div>
        <div className="grid gap-6">
          <form>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <input
                  type="email"
                  name="email"
                  onChange={onChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-ring focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-0 focus-visible:border-ring"
                  id="email"
                  placeholder="name@example.com"
                  value={loginData.email}
                />
              </div>
              <div className="grid gap-1">
                <input
                  type="password"
                  name="password"
                  onChange={onChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-ring focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-0 focus-visible:border-ring"
                  id="password"
                  placeholder="password*"
                  value={loginData.value}
                />
              </div>
              <button
                onClick={handleLogin}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border border-input dark:border-gray-500 bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                Login
              </button>
            </div>
          </form>
          <button
            onClick={() => setTab("forgot_password")}
            className={`tablink ${styles.forgot_password_btn}`}
          >
            I forgot my password ?
          </button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                OR CONTINUE
              </span>
            </div>
          </div>
          <button
            onClick={loginWithGithub}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border border-input dark:border-gray-500 bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            type="button"
          >
            <img
              alt="Github Logo"
              loading="lazy"
              width="24"
              height="24"
              decoding="async"
              data-nimg="1"
              className={`mr-2 ${styles.federated_login_img}`}
              srcSet="imgs/github-mark.png 2x"
              src="imgs/github-mark.png"
            />
            Login with GitHub
          </button>
          <button
            onClick={loginWithGoogle}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border border-input dark:border-gray-500 bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            type="button"
          >
            <img
              alt="Google Logo"
              loading="lazy"
              width="24"
              height="24"
              decoding="async"
              data-nimg="1"
              className={`mr-2 ${styles.federated_login_img}`}
              src="imgs/google.svg"
            />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
