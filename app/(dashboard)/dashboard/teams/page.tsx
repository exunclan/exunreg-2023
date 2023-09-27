"use client";

import Image from "next/image";
import { Column, Row } from "@/components/Flex";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/util/data/Events";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import { Groups } from "@/util/types";
import { Images } from "@/util/data/Events";

const Card = ({
  link,
  image,
  name,
  summary,
}: {
  link: string;
  image: string;
  name: string;
  summary: string;
}) => {
  return (
    <a href={link} className="w-3/4 lg:w-1/3 h-[15rem] m-4">
      <div className="flex flex-col lg:flex-row items-center justify-center rounded-lg shadow-md m-4 w-full h-full">
        <div className="flex flex-col justify-center items-center p-4">
          <Image
            className="mx-12 my-10"
            src={image}
            alt={name}
            height={175}
            width={175}
          />
        </div>
        <div className="flex flex-col justify-center  bg-light-blue h-full w-full py-8 pl-12 pr-6">
          <div className="text-accent text-xl font-semibold mb-2">{name}</div>
          <div className="text-sm text-accent">{summary}</div>
        </div>
      </div>
    </a>
  );
};

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
              name={Groups[name]}
              summary={""}
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
