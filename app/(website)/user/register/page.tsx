"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  name: string;
  password: string;
  rePassword: string;
  phone: string;
  teacher: string;
  teacherEmail: string;
  principal: string;
  address: string;
  ncr: boolean;
};

export default function SignIn() {
  const { register, control, handleSubmit } = useForm<FormData>();
  const [error, setError] = useState<string | null>(null);
  const [password, rePassword] = useWatch({
    control,
    name: ["password", "rePassword"],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSignIn = handleSubmit(async (data) => {
    setError(null);
    setLoading(true);

    const res = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());

    if (res.error) {
      if (res.error === "user_already_exists")
        setError("User with the given email already exists.");
    } else router.replace("/dashboard");

    setLoading(false);
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
          <label className="text-sm text-sub">Name of School</label>
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

        <div className="flex flex-col my-3">
          <label className="text-sm text-sub">Contact Number</label>
          <input
            required
            className="border border-sub rounded-md p-2 text-text"
            {...register("phone")}
          />
        </div>

        <div className="flex flex-col my-3">
          <label className="text-sm text-sub">Name of Teacher Incharge</label>
          <input
            required
            className="border border-sub rounded-md p-2 text-text"
            {...register("teacher")}
          />
        </div>

        <div className="flex flex-col my-3">
          <label className="text-sm text-sub">
            {"Email of Teacher Incharge"}
          </label>
          <input
            type="email"
            required
            className="border border-sub rounded-md p-2 text-text"
            {...register("teacherEmail")}
          />
        </div>

        <div className="flex flex-col my-3">
          <label className="text-sm text-sub">Name of Principal</label>
          <input
            required
            className="border border-sub rounded-md p-2 text-text"
            {...register("principal")}
          />
        </div>

        <div className="flex flex-col my-3">
          <label className="text-sm text-sub">School Address</label>
          <input
            required
            className="border border-sub rounded-md p-2 text-text"
            {...register("address")}
          />
        </div>

        <div className="flex flex-row justify-between my-3">
          <label className="text-sm text-sub">Is your school in the NCR?</label>
          <input
            type="checkbox"
            className="border border-sub rounded-md p-2 text-text"
            {...register("ncr")}
          />
        </div>

        <div className="text-text self-end text-xs md:text-sm my-1">
          Already have an account?{" "}
          <span className="border-b border-dashed">
            <a href="/user/signin">Sign-in instead.</a>
          </span>
        </div>

        <button
          className={`my-2 ${
            password === rePassword ? "bg-main" : "bg-text"
          } p-2 rounded-md text-white`}
          type="submit"
          disabled={password != rePassword || loading}
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}
