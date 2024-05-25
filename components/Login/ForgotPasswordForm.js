"use client";
import { useState } from "react";
import styles from "./Login.module.css";
import { forgotPassword, resetPassword, verifyOtp } from "../../api";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";

const stateMap = {
  "send-email": {
    heading: "I forgot my password",
    desc: "Please enter your email to proceed.",
  },
  "verify-otp": {
    heading: "Enter otp",
    desc: "We have sent you an email. Please enter the otp mentioned in the email.",
  },
  "reset-password": {
    heading: "Enter new password",
    desc: "Enter your new password.",
  },
};

const VerifyEmailForm = ({ email, setEmail, action, error, loading }) => {
  return (
    <form>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <input
            type="email"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-ring focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-0 focus-visible:border-ring"
            id="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {error && <span className="form-error-message"> {error} </span>}
        </div>
        <button
          onClick={action}
          disabled={loading}
          style={{
            backgroundColor: "black",
            color: "white",
          }}
          className="inline-flex gap-2 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border border-input dark:border-gray-500 bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          {loading && <CircularProgress color="inherit" size={14} />}
          Send Verification Code
        </button>
      </div>
    </form>
  );
};

const VerifyOtpForm = ({ otp, setOtp, action, error, loading }) => {
  return (
    <form>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <input
            type="otp"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-ring focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-0 focus-visible:border-ring"
            id="otp"
            placeholder="Enter otp"
            value={otp}
            onChange={(event) => setOtp(event.target.value)}
          />
          {error && <span className="form-error-message"> {error} </span>}
        </div>
        <button
          onClick={action}
          disabled={loading}
          style={{
            backgroundColor: "black",
            color: "white",
          }}
          className="inline-flex gap-2 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border border-input dark:border-gray-500 bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          {loading && <CircularProgress color="inherit" size={14} />}
          Verify Otp
        </button>
      </div>
    </form>
  );
};

const ResetPasswordForm = ({
  password,
  setPassword,
  action,
  error,
  loading,
}) => {
  return (
    <form>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <input
            type="password"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-ring focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-0 focus-visible:border-ring"
            id="password"
            placeholder="Enter new password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {error && <span className="form-error-message"> {error} </span>}
        </div>
        <button
          onClick={action}
          disabled={loading}
          style={{
            backgroundColor: "black",
            color: "white",
          }}
          className="inline-flex gap-2 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border border-input dark:border-gray-500 bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          {loading && <CircularProgress color="inherit" size={14} />}
          Reset Password
        </button>
      </div>
    </form>
  );
};

const ForgotPasswordForm = ({ setTab }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Step can be send-email, verify-otp, reset-password
  const [step, setStep] = useState("send-email");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    let response;
    if (step === "send-email") {
      response = await forgotPassword(email);
      if (response) {
        setStep("verify-otp");
      } else {
        setError("Failed to send email. Please try again");
      }
    } else if (step === "verify-otp") {
      response = await verifyOtp(email, otp);
      const { success, message } = response;
      if (success) {
        setStep("reset-password");
      } else {
        setError(message);
      }
    } else {
      response = await resetPassword(email, password);
      if (response) {
        setTab("login");
      } else {
        setError("Failed to set new password. Please try again.");
      }
    }

    setLoading(false);
  };

  return (
    <div id="Lost" className={`tabcontent ${styles.login_form_container}`}>
      <div className="flex w-full flex-col justify-center space-y-6 h-96">
        <div className="flex flex-col space-y-2 text-center">
          <div className="inline-block transition duration-200 ease-in-out text-content-emphasis">
            <h4>{stateMap[step].heading}</h4>
            <span className={styles.forgot_password_desc}>
              {stateMap[step].desc}
            </span>
          </div>
          <div className="grid gap-6">
            {step === "send-email" && (
              <VerifyEmailForm
                email={email}
                setEmail={setEmail}
                action={handleResetPassword}
                error={error}
                loading={loading}
              />
            )}

            {step === "reset-password" && (
              <ResetPasswordForm
                password={password}
                setPassword={setPassword}
                action={handleResetPassword}
                error={error}
                loading={loading}
              />
            )}

            {step === "verify-otp" && (
              <VerifyOtpForm
                otp={otp}
                setOtp={setOtp}
                action={handleResetPassword}
                error={error}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
