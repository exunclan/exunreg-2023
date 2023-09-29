import { getServerSession } from "next-auth/next";

import { authOptions } from "@/util/auth";
import { Column } from "@/components/Flex";
import TeamData from "@/components/TeamData";

export default async function DashboardEventTeamsPage({
  params,
}: {
  params: { event: string };
}) {
  console.log(params.event);
  const event = params.event.replaceAll("%20", " ").replaceAll("%2B", "+");
  const session = await getServerSession(authOptions);

  const team = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/dashboard/${event}?` +
      new URLSearchParams({
        userId: session?.user?.id,
      })
  ).then((res) => res.json());

  return (
    <Column className="m-3">
      <div className="text-main text-4xl font-semibold text-center m-6">
        {event} Team
      </div>
      <TeamData event={event} team={team} userId={session?.user?.id} />
    </Column>
  );
}
