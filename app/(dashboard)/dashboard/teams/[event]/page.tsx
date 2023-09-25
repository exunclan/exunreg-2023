import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Column } from "@/components/Flex";
import TeamData from "@/components/TeamData";
import { TeamMember } from "@/util/types";

export default async function DashboardEventTeamsPage({
  params,
}: {
  params: { event: string };
}) {
  const event = params.event.replaceAll("%20", " ");
  const session = await getServerSession(authOptions);

  // const team = fetch(
  //   process.env.NEXT_PUBLIC_URL +
  //     "/api/dashboard/teams" +
  //     new URLSearchParams({
  //       userId: session?.user?.id,
  //       event,
  //     })
  // ).then((res) => res.json());

  const team: TeamMember[] = [
    {
      id: "1",
      name: "Alistair",
      phone: "814-791-4957",
      role: "Estimator",
      email: "ahurry0@wp.com",
      class: "X",
    },
    {
      id: "2",
      name: "Darrell",
      phone: "502-698-8920",
      role: "Construction Worker",
      email: "dnickolls1@jugem.jp",
      class: "X",
    },
    {
      id: "3",
      name: "Elspeth",
      phone: "320-521-2637",
      role: "Construction Worker",
      email: "efiske2@opensource.org",
      class: "VIII",
    },
    {
      id: "4",
      name: "Dianna",
      phone: "531-152-8799",
      role: "Engineer",
      email: "dlowman3@facebook.com",
      class: "X",
    },
  ];

  const addMember = () => {
    let newMembers = [
      { name: "New Member", phone: "", role: "", email: "", class: "" },
      ...team,
    ];
  };

  return (
    <Column className="m-3">
      <div className="text-main text-4xl font-bold text-center">
        {event} Team
      </div>
      <TeamData event={event} team={team} />
    </Column>
  );
}
