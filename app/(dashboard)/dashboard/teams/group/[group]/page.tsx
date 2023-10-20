"use client";

import { Column } from "@/components/Flex";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/util/data/Events";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import Image from "next/image";
import { Row } from "@/components/Flex";
import Card from "@/components/Card";
import { Groups } from "@/util/data/Events";

export default function DashboardEventTeamsPage({
  params,
}: {
  params: { group: string };
}) {
  const {
    isLoading,
    data: events,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!events || error) {
    return <Error />;
  }

  const Events = events.filter((x) => x.group === params.group);

  return (
    <Column className="m-3">
      <div className="text-main text-4xl font-semibold text-center m-6">
        {Groups[params.group].name}
      </div>

      <Row className="flex-wrap my-4 w-full">
        {Events.map(({ name, summary, image }, i) => (
          <Card
            key={i}
            link={`/dashboard/teams/${name
              .replaceAll("+", "%2B")
              .replaceAll(" ", "%20")
              .replaceAll("%3A", ":")}`}
            image={image}
            name={name}
            summary={summary}
          />
        ))}
      </Row>
    </Column>
  );
}
