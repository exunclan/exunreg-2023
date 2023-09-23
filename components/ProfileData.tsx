"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

type FormData = {
  email: string;
  name: string;
  phone: string;
  teacher: string;
  teacherEmail: string;
  principal: string;
  address: string;
  ncr: boolean;
};

export default function ProfileData({ values }: { values: FormData }) {
  const {
    formState: { isDirty },
    reset,
    register,
    handleSubmit,
  } = useForm<FormData>({
    values,
  });

  const [notification, setNotification] = useState<{
    message: string;
    type: "error" | "info";
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignIn = handleSubmit(async (data) => {
    setNotification(null);
    setLoading(true);

    await fetch("/api/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        updated: data,
      }),
    }).then((res) => res.json());

    setNotification({
      message:
        "The data has been updated. It will reflect on the dashboard within a few minutes.",
      type: "info",
    });
    setLoading(false);
    reset(data);
  });

  return (
    <div className="flex flex-col justify-center items-center h-max m-4">
      <div className="text-4xl md:text-6xl text-main font-bold m-4">
        Profile
      </div>

      <form
        onSubmit={handleSignIn}
        className="flex flex-col justify-start w-[80vw] md:w-1/3"
      >
        {notification && (
          <div
            className={`${
              notification.type === "error" ? "bg-red-500" : "bg-yellow-500"
            } text-white p-3 rounded-md text-md`}
          >
            {notification.message}
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
            disabled
            className="bg-gray-100 border border-sub rounded-md p-2 text-text"
            {...register("email")}
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
            disabled
            required
            className="bg-gray-100 border border-sub rounded-md p-2 text-text"
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

        {isDirty && (
          <button
            className={`my-2 bg-main p-2 rounded-md text-white`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Save Changes"}
          </button>
        )}
      </form>
    </div>
  );
}
