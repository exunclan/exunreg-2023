"use client";

import { TeamMember } from "@/util/types";
import type { IEvent } from "@/util/data/Events";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

enum ClassEnum {
  "I" = "I",
  "II" = "II",
  "III" = "III",
  "IV" = "IV",
  "V" = "V",
  "VI" = "VI",
  "VII" = "VII",
  "VIII" = "VIII",
  "IX" = "IX",
  "X" = "X",
  "XI" = "XI",
  "XII" = "XII",
}

type FormData = {
  name: string;
  email: string;
  phone: string;
  role: string;
  class: ClassEnum;
};

export default function Member({
  userId,
  data,
  eventData,
  setMemberOpen,
  memberOpen,
  removeMember,
}: {
  userId: string;
  data: TeamMember;
  eventData: IEvent;
  setMemberOpen: Dispatch<SetStateAction<string | null>>;
  memberOpen: string | null;
  removeMember: (id: string) => void;
}) {
  const {
    formState: { isDirty },
    register,
    watch,
    reset,
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role || "Member",
      class: data.class as ClassEnum,
    },
  });
  const [loading, setLoading] = useState<boolean>(false);

  const classes = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII",
    "VIII",
    "IX",
    "X",
    "XI",
    "XII",
  ];

  const classLimits = eventData.classes.split("-");
  const classMin = classes.indexOf(classLimits[0]),
    classMax = classes.indexOf(classLimits[1]);
  const classRange = classes.slice(
    classMin,
    classMax === -1 ? classMin + 1 : classMax + 1
  );

  const handleSave = handleSubmit(async (formData) => {
    setLoading(true);
    await fetch(`/api/dashboard/${eventData.name}/member`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        data: {
          _id: data._id,
          ...formData,
        },
      }),
    });
    setLoading(false);
    reset(formData);
  });

  return (
    <div className="w-full flex flex-col jutify-center items-center m-1">
      <div
        className={`${
          memberOpen === data._id && "text-white bg-main"
        } flex flex-row justify-between items-center p-2 rounded-md border border-sub md:w-1/2 w-[80vw] cursor-pointer`}
        onClick={() => setMemberOpen(memberOpen === data._id ? null : data._id)}
      >
        {watch("name")}

        {memberOpen === data._id ? (
          <BsFillCaretUpFill />
        ) : (
          <BsFillCaretDownFill />
        )}
      </div>

      {memberOpen === data._id && (
        <div className={`rounded-b-md bg-gray-100 md:w-1/2 w-[80vw] p-4 mb-3`}>
          <form>
            <div className="flex flex-col my-3">
              <label className="text-sm text-sub">Name</label>
              <input
                required
                className="border border-sub rounded-md p-2 text-text"
                {...register("name")}
              />
            </div>

            <div className="flex flex-col my-3">
              <label className="text-sm text-sub">Email</label>
              <input
                type="email"
                className="border border-sub rounded-md p-2 text-text"
                {...register("email")}
              />
            </div>

            <div className="flex flex-col my-3">
              <label className="text-sm text-sub">Phone</label>
              <input
                required
                className="border border-sub rounded-md p-2 text-text"
                {...register("phone")}
              />
            </div>

            <div className="flex flex-col my-3">
              <label className="text-sm text-sub">Class</label>
              <select
                required
                className="border border-sub rounded-md p-2 text-text"
                {...register("class")}
              >
                {classRange.map((x, i) => (
                  <option value={x} key={i}>
                    {x}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col my-3">
              <label className="text-sm text-sub">Role</label>
              <input
                required
                className="border border-sub rounded-md p-2 text-text"
                {...register("role")}
              />
            </div>

            <div className="flex flex-row justify-center items-center">
              {isDirty && (
                <button
                  type="submit"
                  disabled={loading}
                  className="p-2 bg-main text-white rounded-md mr-2"
                  onClick={() => handleSave()}
                >
                  {loading ? "Loading..." : "Save"}
                </button>
              )}

              <div
                onClick={() => {
                  confirm(`Are you sure you want to remove ${data.name}?`) &&
                    removeMember(data._id);
                }}
                className="p-2 bg-none border border-red-500 text-red-500 rounded-md"
              >
                Remove
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
