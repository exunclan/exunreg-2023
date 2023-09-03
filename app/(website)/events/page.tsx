import { Events } from "@/data/Events";
import Image from "next/image";

export default function EventsPage() {
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
              independant,
              registration,
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
                    Open for classes {classes} <br />
                    No. of teams per school: {participants} <br />
                    Indepependant Registration:{" "}
                    {independant ? "Allowed" : "Not Allowed"} <br />
                    Registration: {registration ? "Enabled" : "Closed"}
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
