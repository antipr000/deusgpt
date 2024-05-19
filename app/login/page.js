import React from "react";
import LoginComponent from "../../components/Login";
import styles from "../../styles/Login.module.css";

const Login = () => {
  return (
    <div class="login-12 tab-box">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-6 col-md-12 bg-img">
						<div class="relative hidden h-screen flex-col bg-muted p-10 items-center justify-center lg:flex">
							<img class="hidden h-24 bg-groq-cloud-logo bg-contain bg-center bg-no-repeat dark:bg-groq-cloud-logo-dark lg:block z-10"
                     width={"100%"}
                     height={"30%"}
                     style={{ minHeight: "300px" }}
                     src={"logo.png"}/>
							<div class="hidden absolute inset-0 bg-gradient-to-br from-background via-[#1C2330] to-background z-0 dark:block"></div>
							<div class="absolute inset-0 dark:hidden z-0 "></div>
							<div class="relative z-20">
								<div class="inline-block transition duration-200 ease-in-out text-content-emphasis font-medium"
                     style={{ fontSize: "20px" }}>Experience the fastest inference in the world</div>
 							</div>
						</div>
					</div>
          <div class={`col-lg-6 col-md-12 form-section ${styles.login_section_container}`}>
            <div class="mx-auto flex w-full flex-col items-center justify-center space-y-6">
              <div class="mt-6 lg:hidden h-[33px] w-[110px] bg-groq-cloud-logo bg-contain bg-center bg-no-repeat dark:bg-groq-cloud-logo-dark"></div>
              <LoginComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
