"use client";

import { fetchEvents } from "@/util/data/Events";
import { useQuery } from "@tanstack/react-query";
import EventDescription from "@/components/EventDescription";
import Loading from "@/components/Loading";

export default function EventsPage() {
  const {
    isLoading,
    error,
    data: Events,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!Events || error) {
    return <>error</>;
  }

  console.log(Events);

  return (
    <div className="my-[4rem] mx-[2rem] md:mx-[9rem]">
      <div className="text-main text-5xl md:text-6xl font-semibold">Events</div>
      <div>
        {Events.map(
          (
            {
              name,
              classes,
              participants,
              teams,
              independent,
              registrations,
              image,
              description,
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
              description={description}
            />
          )
        )}
      </div>
    </div>
  );
}
