"use client";

import { fetchEvents } from "@/util/data/Events";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import EventDescription from "@/components/EventDescription";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

export default function EventsPage() {
  const {
    isLoading,
    error,
    data: Events,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  const [query, setQuery] = useState<string>("");

  if (isLoading) return <Loading />;

  if (!Events || error) return <Error />;

  return (
    <div className="my-[4rem] mx-[2rem] md:mx-[9rem]">
      <div className="text-main text-5xl md:text-6xl font-semibold">Events</div>
      <div className="input-group my-5">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setQuery(e.target.value as string);
          }}
        />
      </div>
      <div>
        {Events.filter((obj: { [key: string]: any }) =>
          Object.keys(obj).some(
            (key) =>
              typeof obj[key] === "string" &&
              obj[key].toLowerCase().includes(query.toLowerCase())
          )
        ).map(
          (
            {
              name,
              classes,
              participants,
              teams,
              independent,
              registrations,
              image,
              mode,
              description,
              summary,
            },
            i
          ) => (
            <EventDescription
              key={i}
              name={name}
              classes={classes}
              participants={participants}
              teams={teams}
              independent={independent}
              registrations={registrations}
              image={image}
              mode={mode}
              summary={summary}
              description={description}
            />
          )
        )}
      </div>
    </div>
  );
}
