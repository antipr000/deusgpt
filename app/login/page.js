"use client";
import React from "react";
import LoginComponent from "../../components/Login";
import styles from "../../styles/Login.module.css";
import Footer from "../../components/Footer/footer";
import { useAtomValue } from "jotai";
import { idTokenAtom } from "../../store";

const Login = () => {
  const idToken = useAtomValue(idTokenAtom);

  console.log("Received new id token value", idToken);
  return (
    <div className="login-12 tab-box">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 col-md-12 bg-img">
            <div className="relative hidden h-screen flex-col bg-muted p-10 items-center justify-center lg:flex">
              <img
                className="hidden h-24 bg-groq-cloud-logo bg-contain bg-center bg-no-repeat dark:bg-groq-cloud-logo-dark lg:block z-10"
                width={"100%"}
                height={"30%"}
                style={{ minHeight: "300px" }}
                src={"logo.png"}
              />
              <div className="hidden absolute inset-0 bg-gradient-to-br from-background via-[#1C2330] to-background z-0 dark:block"></div>
              <div className="absolute inset-0 dark:hidden z-0 "></div>
              <div className="relative z-20">
                <div
                  className="inline-block transition duration-200 ease-in-out text-content-emphasis font-medium"
                  style={{ fontSize: "20px" }}
                >
                  Experience the fastest inference in the world
                </div>
              </div>
            </div>
          </div>
          <div
            className={`col-lg-6 col-md-12 form-section ${styles.login_section_container}`}
          >
            <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6">
              <div className="mt-6 lg:hidden h-[33px] w-[110px] bg-groq-cloud-logo bg-contain bg-center bg-no-repeat dark:bg-groq-cloud-logo-dark"></div>
              <LoginComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
