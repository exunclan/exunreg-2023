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
  const event = params.event
    .replaceAll("%20", " ")
    .replaceAll("%2B", "+")
    .replaceAll("%3A", ":");
  const session = await getServerSession(authOptions);

  const team = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/dashboard/${event}?` +
      new URLSearchParams({
        userId: session?.user?.id,
      })
  ).then((res) => res.json());

  return (
    <Column className="m-3">
      <div className="text-main text-4xl font-semibold text-center mx-6 mt-6 mb-2">
        {event} Team
      </div>
      <div className="text-accent-light text-lg mb-4">
        You are responsible for any incorrect data entered. Your data might be
        shared with our sponsors for reference purposes.
      </div>
      <TeamData event={event} team={team} userId={session?.user?.id} />
    </Column>
  );
}
