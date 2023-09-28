"use client";

import { Column, Row } from "@/components/Flex";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/util/data/Events";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import Card from "@/components/Card";
import { Groups } from "@/util/data/Events";
import { Images } from "@/util/data/Events";

export default function DashboardTeamsPage() {
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

  const groupEvents = events.filter((x) => !!x.group);
  const groups = Array.from(new Set(groupEvents.map((x) => x.group)));
  const filteredEvents = events.filter((x) => !x.group);

  return (
    <>
      <Column>
        <div className="text-4xl text-main font-semibold mt-5 mb-3">
          Manage Teams
        </div>
        <Row className="flex-wrap my-4 w-full">
          {groups.map((name, i) => (
            <Card
              key={i}
              link={`/dashboard/teams/group/${name}`}
              image={Images[name]}
              name={Groups[name].name}
              summary={Groups[name].summary}
            />
          ))}
          {filteredEvents.map(({ name, summary, image }, i) => (
            <Card
              key={i}
              link={`/dashboard/teams/${name}`}
              name={name}
              summary={summary}
              image={image}
            />
          ))}
        </Row>
      </Column>
    </>
  );
}
