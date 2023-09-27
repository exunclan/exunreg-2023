"use client";

import { Column } from "@/components/Flex";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/util/data/Events";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import Image from "next/image";
import { Row } from "@/components/Flex";
import { Groups } from "@/util/types";

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
        {Groups[params.group]}
      </div>

      <Row className="flex-wrap my-4 w-full">
        {Events.map(({ name, summary, image }, i) => (
          <a
            href={`/dashboard/teams/${name}`}
            key={i}
            className="w-3/4 lg:w-1/3 h-[15rem] m-4"
          >
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
                <div className="text-accent text-xl font-semibold mb-2">
                  {name}
                </div>
                <div className="text-sm text-accent">{summary}</div>
              </div>
            </div>
          </a>
        ))}
      </Row>
    </Column>
  );
}
