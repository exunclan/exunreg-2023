"use client";

import { fetchEvents } from "@/util/data/Events";
import EventDescription from "@/components/EventDescription";

export default async function EventsPage() {
  const Events = await fetchEvents();

  return (
    <div className="my-[4rem] mx-[9rem]">
      <div className="text-main text-6xl font-bold">Events</div>
      <div>
        {Events.map(
          (
            {
              name,
              classes,
              participants,
              teams,
              independant,
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
              independant={independant}
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
