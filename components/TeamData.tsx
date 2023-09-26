"use client";

import type { TeamMember } from "@/util/types";
import { useState } from "react";
import { fetchEvents } from "@/util/data/Events";
import { useQuery } from "@tanstack/react-query";
import Member from "./Member";
import { AiOutlinePlus } from "react-icons/ai";
import Loading from "./Loading";

export default function TeamData({
  event,
  team,
  userId,
}: {
  event: string;
  team: TeamMember[];
  userId: string;
}) {
  const [members, setMembers] = useState<TeamMember[]>(team);
  const [memberOpen, setMemberOpen] = useState<string | null>(null);
  const { data, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });
  const eventData = data?.filter((x) => x.name === event)[0];

  if (isLoading) return <Loading />;
  if (error || !eventData) return <>error</>;

  const removeMember = async (id: string) => {
    let filtered = members.filter((x) => x._id.toString() != id);
    await fetch(`/api/dashboard/${event}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        members: filtered,
      }),
    });
    setMembers(filtered);
  };

  const addMember = async () => {
    let newMembers = [...members];
    newMembers.push({
      _id: "",
      name: "New Member",
      phone: "",
      role: "",
      email: "",
      class: "",
    });

    const updatedMembers = await fetch(`/api/dashboard/${event}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        members: newMembers,
      }),
    }).then((res) => res.json());
    setMembers(updatedMembers);
  };

  return (
    <div className="flex flex-col w-full justify-center items-center my-3">
      {members.map((member, i) => (
        <Member
          key={i}
          userId={userId}
          data={member}
          eventData={eventData}
          setMemberOpen={setMemberOpen}
          memberOpen={memberOpen}
          removeMember={removeMember}
        />
      ))}
      {members.length < eventData.participants && (
        <div
          className="my-2 p-2 bg-main text-white flex flex-row justify-center items-center rounded-md cursor-pointer"
          onClick={() => addMember()}
        >
          <AiOutlinePlus className="mx-2" />
          Add Member
        </div>
      )}
    </div>
  );
}
