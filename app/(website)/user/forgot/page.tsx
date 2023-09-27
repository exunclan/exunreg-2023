"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
};

export default function Forgot() {
  const { register, handleSubmit } = useForm<FormData>();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleForgot = handleSubmit(async (data) => {
    setError(null);
    setLoading(true);

    const res = await fetch("/api/user/forgot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    if (res.error) {
      if (res.error === "account_not_found")
        setError("User with the given email doesn't exists.");
    } else setSuccess(true);

    setLoading(false);
  });

  return (
    <div className="flex flex-col justify-center items-center h-max m-4">
      <div className="text-4xl md:text-4xl text-main font-semibold m-4">
        Forgot password
      </div>
      {success ? (
        <div className="text-accent text-xl w-[80vw] md:w-2/3 text-center">
          Please check the inbox of the registered School email for password
          reset link. It is valid for only 1 hour.
        </div>
      ) : (
        <form
          onSubmit={handleForgot}
          className="flex flex-col justify-start w-[80vw] md:w-1/3"
        >
          {error && (
            <div className="bg-red-500 text-white p-3 rounded-md text-md">
              {error}
            </div>
          )}

          <div className="flex flex-col my-3">
            <label className="text-sm text-accent">{"Email"}</label>
            <input
              type="email"
              required
              className="border border-sub rounded-md p-2 text-accent-light"
              {...register("email")}
            />
          </div>

          <button
            className="my-2 bg-main p-2 rounded-md text-white"
            type="submit"
          >
            {loading ? "Loading..." : "Send reset link"}
          </button>
        </form>
      )}
    </div>
  );
}
