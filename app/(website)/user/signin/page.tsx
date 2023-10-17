"use client";

import { SignInResponse, signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { handleSubmit, register, setValue } = useForm<FormData>();
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSignIn = handleSubmit(async (data) => {
    setError(null);
    setLoading(true);

    const { error, url } = (await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/dashboard",
    })) as SignInResponse;

    if (error) {
      setValue("password", "");
      if (error === "account_not_found")
        setError("Account does not exist. Please create a new one.");
      else if (error === "incorrect_password")
        setError("Wrong password. Please try again.");
      else if (error === "email_not_verified")
        setError("The email has not yet been verified.");
      else if (error === "teacher_email_not_verified")
        setError("The email of the Teacher Incharge has not yet been verified");
      else setError("Some unexpected error occured. Please try again later");
      console.log(error);
    } else router.replace(url!);

    setLoading(false);
  });

  return (
    <div className="flex flex-col justify-center items-center h-max m-4">
      <div className="text-4xl md:text-6xl text-main font-semibold m-4">
        Sign In
      </div>

      <form
        onSubmit={handleSignIn}
        className="flex flex-col justify-start w-[80vw] md:w-1/3"
      >
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-md text-md">
            {error}
          </div>
        )}

        <div className="flex flex-col my-3">
          <label className="text-sm text-accent">Email</label>
          <input
            type="email"
            required
            className="border border-sub rounded-md p-2 text-accent-light"
            {...register("email")}
          />
        </div>

        <div className="flex flex-col my-3">
          <label className="text-sm text-accent">Password</label>
          <input
            className="border border-sub rounded-md p-2 text-accent-light"
            required
            type="password"
            {...register("password")}
          />
        </div>

        <div className="text-accent-light self-end text-xs md:text-sm my-1">
          Forgot Password?{" "}
          <span className="border-b border-dashed">
            <a href="/user/forgot">Reset it.</a>
          </span>
        </div>
        <div className="text-accent-light self-end text-xs md:text-sm my-1">
          Dont have an account?{" "}
          <span className="border-b border-dashed">
            <a href="/user/register">Create one.</a>
          </span>
        </div>

        <button
          className="my-2 bg-main p-2 rounded-md text-white"
          disabled={loading}
          type="submit"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
