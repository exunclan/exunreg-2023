"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useSearchParams } from "next/navigation";

type FormData = {
  password: string;
  rePassword: string;
};

export default function Reset() {
  const { register, control, handleSubmit } = useForm<FormData>();
  const [password, rePassword] = useWatch({
    control,
    name: ["password", "rePassword"],
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const handleReset = handleSubmit(async (data) => {
    setError(null);
    setLoading(true);

    const res = await fetch("/api/user/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token, newPass: data.password }),
    }).then((res) => res.json());

    if (res.error) {
      setSuccess(res.error);
    }
    if (res.success) {
      setSuccess(res.success);
    }

    setLoading(false);
  });

  return success ? (
    <div className="w-full flex justify-center items-center text-2xl text-main font-bold">
      {success === "reset_successful" && "Password reset successful!"}
      {success === "token_invalid" && "The reset token is invalid."}
      {success === "token_expired" &&
        "The reset link has expired. Please try again."}
    </div>
  ) : !token ? (
    <div className="w-full flex justify-center items-center text-2xl text-main font-bold">
      The reset link is invalid.
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center h-max m-4">
      <div className="text-4xl md:text-4xl text-main font-semibold m-4">
        Reset password
      </div>

      <form
        onSubmit={handleReset}
        className="flex flex-col justify-start w-[80vw] md:w-1/3"
      >
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-md text-md">
            {error}
          </div>
        )}

        <div className="flex flex-col my-3">
          <label className="text-sm text-accent">Password</label>
          <input
            className="border border-sub rounded-md p-2 text-accent-light"
            required
            type="password"
            {...register("password")}
          />
        </div>
        <div className="flex flex-col my-3">
          <div className="flex flex-row justify-between">
            <label className="text-sm text-accent">Re-enter Password</label>
            {password !== rePassword && (
              <label className="text-sm text-red-500">
                Passwords do not match
              </label>
            )}
          </div>
          <input
            className="border border-sub rounded-md p-2 text-accent-light"
            required
            type="password"
            {...register("rePassword")}
          />
        </div>

        <button
          className={`my-2 ${
            password === rePassword ? "bg-main" : "bg-text"
          } p-2 rounded-md text-white`}
          type="submit"
          disabled={password != rePassword || loading}
        >
          {loading ? "Loading..." : "Reset"}
        </button>
      </form>
    </div>
  );
}
