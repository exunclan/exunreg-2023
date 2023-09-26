import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Column } from "@/components/Flex";
import TeamData from "@/components/TeamData";

export default async function DashboardEventTeamsPage({
  params,
}: {
  params: { event: string };
}) {
  const event = params.event.replaceAll("%20", " ");
  const session = await getServerSession(authOptions);

  const team = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/dashboard/${event}?` +
      new URLSearchParams({
        userId: session?.user?.id,
      })
  ).then((res) => res.json());

  return (
    <Column className="m-3">
      <div className="text-main text-4xl font-bold text-center">
        {event} Team
      </div>
      <TeamData event={event} team={team} userId={session?.user?.id} />
    </Column>
  );
}
