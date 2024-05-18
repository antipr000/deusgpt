import React from "react";
import Image from "next/image";

const Login = () => {
  return (
    <div className="h-[100%] grid lg:grid-cols-2 grid-cols-1">
      <div className="flex justify-center items-center flex-col">
        <Image src="/logo.png" height={100} width={100} />
        <div className="inline-block transition duration-200 ease-in-out text-content-emphasis font-medium text-[20px]">
          Experience the fastest inference in the world
        </div>
      </div>

      <div className="p-[30px]">
        <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6">
          Login
        </div>
      </div>
    </div>
  );
};

export default Login;
