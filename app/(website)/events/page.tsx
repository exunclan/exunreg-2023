"use client";

import Events from "@/util/data/Events";
import Image from "next/image";

export default async function EventsPage() {
  const data = await Events();
  return (
    <div className="my-[4rem] mx-[9rem]">
      <div className="text-main text-6xl font-bold">Events</div>
      <div>
        {data.map(
          (
            {
              name,
              classes,
              participants,
              independant,
              registrations,
              image,
              description,
            },
            i
          ) => (
            <div
              className="flex flex-col justify-center items-start my-10"
              key={i}
            >
              <div
                id={name.split(" ").join()}
                className="flex flex-row justify-between items-center w-full"
              >
                <div className="flex flex-col justify-center items-start">
                  <div className="text-sub font-bold text-4xl my-4">{name}</div>
                  <div className="text-sub text-lg">
                    Open for classes{" "}
                    <span className="font-medium">{classes}</span> <br />
                    No. of teams per school:{" "}
                    <span className="font-medium">{participants}</span> <br />
                    Indepependant Registration:{" "}
                    <span className="font-medium">
                      {independant ? "Allowed" : "Not Allowed"} <br />
                    </span>
                    Registration:{" "}
                    <span className="font-medium">
                      {registrations ? "Enabled" : "Closed"}
                    </span>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <Image
                    src={image}
                    height={200}
                    width={200}
                    alt={name}
                    className="mr-6"
                  />
                </div>
              </div>
              <div>
                <ul className="marker:text-text list-disc p-7">
                  {description.map((x, j) => (
                    <li key={j} className="text-text text-lg font-light">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
