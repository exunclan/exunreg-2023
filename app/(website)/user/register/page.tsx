"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

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
  const [password, rePassword] = useWatch({
    control,
    name: ["password", "rePassword"],
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

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

    setLoading(false);

    if (res.error) {
      if (res.error === "user_already_exists")
        setError("User with the given email already exists.");
      return;
    } else setSuccess(true);

    await fetch("/api/user/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        teacherEmail: data.teacherEmail,
      }),
    });
  });

  return (
    <div className="flex flex-col justify-center items-center h-max m-4">
      <div className="text-4xl md:text-6xl text-main font-semibold m-4">
        Register
      </div>
      {success ? (
        <div className="text-accent text-xl w-[80vw] md:w-2/3 text-center">
          Congratulations! Your registration was successful. Please check the
          inbox of the registered School email and Teacher Incharge email for
          verification links before you can Sign In.
        </div>
      ) : (
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
            <label className="text-sm text-accent">Name of School</label>
            <input
              required
              className="border border-sub rounded-md p-2 text-accent-light"
              {...register("name")}
            />
          </div>

          <div className="flex flex-col my-3">
            <label className="text-sm text-accent">
              {"Email (please use your school/club's email)"}
            </label>
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

          <div className="flex flex-col my-3">
            <label className="text-sm text-accent">Contact Number</label>
            <input
              required
              className="border border-sub rounded-md p-2 text-accent-light"
              {...register("phone")}
            />
          </div>

          <div className="flex flex-col my-3">
            <label className="text-sm text-accent">
              Name of Teacher Incharge
            </label>
            <input
              required
              className="border border-sub rounded-md p-2 text-accent-light"
              {...register("teacher")}
            />
          </div>

          <div className="flex flex-col my-3">
            <label className="text-sm text-accent">
              {"Email of Teacher Incharge"}
            </label>
            <input
              type="email"
              required
              className="border border-sub rounded-md p-2 text-accent-light"
              {...register("teacherEmail")}
            />
          </div>

          <div className="flex flex-col my-3">
            <label className="text-sm text-accent">Name of Principal</label>
            <input
              required
              className="border border-sub rounded-md p-2 text-accent-light"
              {...register("principal")}
            />
          </div>

          <div className="flex flex-col my-3">
            <label className="text-sm text-accent">School Address</label>
            <input
              required
              className="border border-sub rounded-md p-2 text-accent-light"
              {...register("address")}
            />
          </div>

          <div className="flex flex-row justify-between my-3">
            <label className="text-sm text-accent">
              Is your school in the NCR?
            </label>
            <input
              type="checkbox"
              className="border border-sub rounded-md p-2 text-accent-light"
              {...register("ncr")}
            />
          </div>

          <div className="text-accent-light self-end text-xs md:text-sm my-1">
            <span className="border-b border-dashed">
              <a href="https://exun.co/independentreg" target="_blank">
                Register
              </a>{" "}
            </span>
            independently?
          </div>

          <div className="text-accent-light self-end text-xs md:text-sm my-1">
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
      )}
    </div>
  );
}
