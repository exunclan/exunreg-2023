"use client";

import Image from "next/image";
import { Column, Row } from "@/components/Flex";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/util/data/Events";
import Loading from "@/components/Loading";

export default function DashboardTeamsPage() {
  const {
    isLoading,
    data: events,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  if (!events || error) {
    return <>error</>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Column>
        <div className="text-4xl text-main font-bold">Manage Teams</div>
        <Row className="flex-wrap my-4 w-[80vw] md:w-2/3">
          {events.map(({ name, image }, i) => (
            <a
              key={i}
              href={`/dashboard/teams/${name}`}
              className="w-[80vw] md:w-[20vw] m-3"
            >
              <Column className="w-[80vw] md:w-[20vw] p-4 border border-sub/[0.5] rounded-lg hover:shadow cursor-pointer">
                <Image
                  className="m-3"
                  src={image}
                  alt={name}
                  height={150}
                  width={150}
                />
                <div className="text-main text-2xl">{name}</div>
              </Column>
            </a>
          ))}
        </Row>
      </Column>
    </>
  );
}
