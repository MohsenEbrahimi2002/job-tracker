"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { signUp } from "@/lib/auth/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signUp.email({
        name,
        email,
        password,
      });

      if (result.error) {
        setError(result.error.message ?? "Failed to sign up");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white p-4">
      <div className="bg-white border border-slate-400/10 p-4 shadow-xl rounded-lg w-sm flex mx-auto flex-col">
        <div className="ml-4">
          <h2 className="font-semibold mt-2 text-xl">Sign Up</h2>
          <span className="text-slate-500 block mt-1 mb-2">
            Create an account to start tracking your job.
          </span>
        </div>
        {error && (
          <div className="rounded-md bg-destructive/15 p-3 mx-4 text-sm text-destructive">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="mx-4">
          <Input
            id="name"
            type="text"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
          />
          <Input
            id="email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="JohnDoe@gmail.com"
            required
          />
          <Input
            id="pass"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="min 8 characters"
            required
            minLength={8}
          />
          <Button
            type="submit"
            variant="submit"
            disabled={loading}
            className="w-full my-4 flex justify-center"
          >
            {loading ? "Creating account..." : "Sign Up"}{" "}
          </Button>
        </form>
        <p className="text-center text-sm text-gray-600 mb-2">
          Already have an account?{"    "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
