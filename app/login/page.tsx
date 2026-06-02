"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import Link from "next/link";

function Login() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
      <div className="bg-white border border-slate-400/10 p-4 shadow-xl rounded-lg w-sm flex mx-auto flex-col">
        <div className="ml-4">
          <h2 className="font-semibold mt-2 text-xl">Login</h2>
          <span className="text-slate-500 block mt-1 mb-2">
            Enter your credentials to access your account.
          </span>
        </div>
        <form className="mx-4">
        
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="JohnDoe@gmail.com"
            required
          />
          <Input
            id="pass"
            type="password"
            label="Password"
            placeholder="min 8 characters"
            required
            minLength={8}
          />
          <Button
            type="submit"
            variant="submit"
            className="w-full my-4 flex justify-center"
          >
            Login
          </Button>
        </form>
        <p className="text-center text-sm text-gray-600 mb-2">
          Already have an account?{"    "}
          <Link
            href="/signup"
            className="font-medium text-primary hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
