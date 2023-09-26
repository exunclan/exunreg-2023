"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { Row, Column } from "@/components/Flex";

import { BsArrowRight } from "react-icons/bs";
import Loading from "@/components/Loading";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") redirect("/user/signin");
  if (status === "loading") return <Loading />;

  return (
    <Column className="w-full my-4">
      <div className="text-4xl text-main font-bold">
        Welcome, {session?.user?.name}
      </div>
      <div className="flex md:flex-row flex-col m-6 my-[3rem] w-[80vw] md:w-1/3">
        <a href="/dashboard/profile" className="w-full m-2">
          <Row className="p-4 border border-sub rounded-md text-center">
            Edit Profile
            <BsArrowRight className="ml-3" />
          </Row>
        </a>
        <a href="/dashboard/teams" className="w-full m-2">
          <Row className="p-4 border border-sub rounded-md text-center">
            Manage Teams
            <BsArrowRight className="ml-3" />
          </Row>
        </a>
      </div>
    </Column>
  );
}
