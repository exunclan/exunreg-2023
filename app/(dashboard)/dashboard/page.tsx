"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { Row, Column } from "@/components/Flex";

import { FiExternalLink } from "react-icons/fi";
import Loading from "@/components/Loading";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") redirect("/user/signin");
  if (status === "loading") return <Loading />;

  return (
    <Column className="w-full my-4">
      <div className="text-4xl text-main font-semibold">
        Welcome {session?.user?.name}!
      </div>
      <div className="flex flex-col m-6 my-[3rem] w-[80vw] md:w-1/3">
        <a href="/dashboard/profile" className="w-full m-2">
          <div className="flex flex-col items-center p-4 border border-sub rounded-lg shadow-md text-center">
            <div className="flex flex-row items-center w-full justify-between">
              <div className="font-semibold text-accent text-xl">
                Edit Profile
              </div>
              <FiExternalLink className="font-semibold text-accent text-xl" />
            </div>
            <div className="w-full text-left text-accent-light text-md justify-self-start">
              Change your profile details
            </div>
          </div>
        </a>

        <a href="/dashboard/teams" className="w-full m-2">
          <div className="flex flex-col items-center p-4 border border-sub rounded-lg shadow-md text-center">
            <div className="flex flex-row items-center w-full justify-between">
              <div className="font-semibold text-accent text-xl">
                Manage Teams
              </div>
              <FiExternalLink className="font-semibold text-accent text-xl" />
            </div>
            <div className="w-full text-left text-accent-light text-md justify-self-start">
              Manage your teams for the various events
            </div>
          </div>
        </a>
      </div>
    </Column>
  );
}
