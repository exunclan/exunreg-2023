"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { redirect } from "next/navigation";

type FormData = {
  email: string;
  name: string;
  password: string;
  rePassword: string;
};

export default function SignIn() {
  const { register, control, handleSubmit } = useForm<FormData>();
  const [error, setError] = useState<string | null>();
  const [password, rePassword] = useWatch({
    control,
    name: ["password", "rePassword"],
  });

  const handleSignIn = handleSubmit(async (data) => {
    await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        name: data.name,
      }),
    })
      .then((res) => res.json())
      .catch((err) => {
        setError("Some error occured. Please try again later.");
        console.log(err);
      });

    if (!error) {
      redirect("/dashboard");
    }
  });

  return (
    <div className="flex flex-col justify-center items-center h-max m-4">
      <div className="text-4xl md:text-6xl text-main font-bold m-4">
        Register
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
          <label className="text-sm text-sub">Name</label>
          <input
            required
            className="border border-sub rounded-md p-2 text-text"
            {...register("name")}
          />
        </div>

        <div className="flex flex-col my-3">
          <label className="text-sm text-sub">
            {"Email (please use your school/club's email)"}
          </label>
          <input
            type="email"
            required
            className="border border-sub rounded-md p-2 text-text"
            {...register("email")}
          />
        </div>

        <div className="flex flex-col my-3">
          <label className="text-sm text-sub">Password</label>
          <input
            className="border border-sub rounded-md p-2 text-text"
            required
            type="password"
            {...register("password")}
          />
        </div>
        <div className="flex flex-col my-3">
          <div className="flex flex-row justify-between">
            <label className="text-sm text-sub">Re-enter Password</label>
            {password !== rePassword && (
              <label className="text-sm text-red-500">
                Passwords do not match
              </label>
            )}
          </div>
          <input
            className="border border-sub rounded-md p-2 text-text"
            required
            type="password"
            {...register("rePassword")}
          />
        </div>

        <div className="text-text self-end text-xs md:text-sm my-1">
          Already have an account?{" "}
          <span className="border-b border-dashed">
            <a href="/user/signin">Sign-in instead.</a>
          </span>
        </div>
        <button
          className="my-2 bg-main p-2 rounded-md text-white"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}
