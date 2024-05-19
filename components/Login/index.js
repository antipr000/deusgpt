"use client";

import { useState } from "react";
import Link from "next/link";

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
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const onChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="bg-white h-[520px] p-6 shadow-lg border-2 w-full max-w-[450px] 
      mt-[24px]"
    >
      <div className="flex justify-between">
        <Link href="/login" className="text-red-500 text-[17px] font-[400]">
          Login
        </Link>
        <Link href="/register" className="text-red-500 text-[17px] font-[400]">
          Register
        </Link>
      </div>
      <div className="mt-[30px]">
        <div className="text-center font-medium">
          Create an account or log in
        </div>

        <div className="grid gap-6 mt-[6px]">
          <form onSubmit={onSubmit}>
            <div className="grid gap-2">
              <div className="grid">
                <Input
                  name="email"
                  placeholder="name@example.com"
                  onChange={onChange}
                  value={values.email}
                  type="email"
                />
              </div>
              <div className="grid">
                <Input
                  name="password"
                  placeholder="password"
                  onChange={onChange}
                  value={values.password}
                  type="password"
                />
              </div>

              <button
                className="inline-flex items-center justify-center whitespace-nowrap
                rounded-md text-sm font-medium ring-offset-background transition-colors 
                focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 
                border border-input dark:border-gray-500 bg-background hover:bg-[#f3f3f2] 
                h-10 px-4 py-2"
              >
                Login
              </button>
            </div>
          </form>

          <button className="border-none outline-none text-[17px] font-[400]">
            I forgot my password?
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative z-10 flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-[#766f6b]">Or continue</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
