import React from "react";
import Link from "next/link";

const Login = () => {
  return (
    <div
      className="bg-white h-[520px] p-6 shadow-lg border-2 w-full max-w-[450px] 
      mt-[24px]"
    >
      <div className="flex justify-between">
        <Link href="/login" className="text-red-500 text-[17px]">
          Login
        </Link>
        <Link href="/register" className="text-red-500 text-[17px]">
          Register
        </Link>
      </div>
      <div className="mt-[30px]">
        <div className="text-center">Create an account or log in</div>
      </div>
    </div>
  );
};

export default Login;
