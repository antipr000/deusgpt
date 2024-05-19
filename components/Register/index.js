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

const Register = () => {
  const [values, setValues] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
          Create an account and log in
        </div>

        <div className="grid gap-6 mt-[6px]">
          <form onSubmit={onSubmit}>
            <div className="grid gap-2">
              <div className="grid">
                <Input
                  name="name"
                  placeholder="Name"
                  onChange={onChange}
                  value={values.name}
                  type="text"
                />
              </div>
              <div className="grid">
                <Input
                  name="lastName"
                  placeholder="Last Name"
                  onChange={onChange}
                  value={values.lastName}
                  type="text"
                />
              </div>
              <div className="grid">
                <Input
                  name="email"
                  placeholder="Email"
                  onChange={onChange}
                  value={values.email}
                  type="email"
                />
              </div>
              <div className="grid">
                <Input
                  name="password"
                  placeholder="Password"
                  onChange={onChange}
                  value={values.password}
                  type="password"
                />
              </div>
              <div className="grid">
                <Input
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={onChange}
                  value={values.confirmPassword}
                  type="password"
                />
              </div>
              <div className="flex gap-4 h-[50px] items-center justify-center">
                <input
                  type="checkbox"
                  checked={values.termsAndConditions}
                  onChange={(e) =>
                    onChange("termsAndConditions", e.target.checked)
                  }
                  id="termsAndConditions"
                  name="termsAndConditions"
                  className="cursor-pointer"
                />
                <label className="cursor-pointer" htmlFor="termsAndConditions">
                  I accept the rules
                </label>
              </div>

              <button
                className="inline-flex items-center justify-center whitespace-nowrap
                rounded-md text-sm font-medium ring-offset-background transition-colors 
                focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 
                border border-input dark:border-gray-500 bg-background hover:bg-[#f3f3f2] 
                h-10 px-4 py-2 mt-[10px]"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
