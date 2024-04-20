import React from "react";
import Link from "next/link";

const LoginForm = () => {
  return (
    <div className="card bg-base-100 shadow-xl lg:w-1/3 md:w-1/2 w-full absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <div className="card-title mx-auto mt-5">Login</div>

      <div className="card-body grid gap-y-8">
        <input
          type="text"
          placeholder="Enter your email"
          className="input input-bordered w-full input-md"
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="input input-bordered w-full input-md"
        />
        <div className="grid gap-y-4">
          <button className="btn btn-primary w-full">Sign up</button>
          <button className="btn btn-neutral w-full">Guest user</button>
        </div>
        <div className="flex justify-center gap-x-2 text-sm">
          <span>Not a member yet?</span>
          <Link className="text-blue-600 underline" href={`/signup`}>
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
