/**
 * An event's section on the `/events` route
 */

"use client";

import Image from "next/image";

export default function EventDescription({
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
}: {
  name: string;
  classes: string;
  participants: number;
  teams: number;
  independent: boolean;
  registrations: boolean;
  image: string;
  mode: string;
  summary: string;
  description: string[];
}) {
  console.log(summary);

  return (
    <div
      id={name.split(" ").join()}
      className="flex flex-col justify-center items-center md:items-start pt-10 md:my-10"
    >
      <div className="flex flex-col-reverse md:flex-row justify-between items-center w-full">
        <div className="flex flex-col justify-center items-center md:items-start">
          <div className="text-accent font-bold text-3xl md:text-4xl my-4">
            {name}
          </div>
          <div className="text-accent text-lg">
            Open for classes <span className="font-medium">{classes}</span>{" "}
            <br />
            Maximum teams per school:{" "}
            <span className="font-medium">{teams}</span> <br />
            Maximum participants per team:{" "}
            <span className="font-medium">{participants}</span> <br />
            Mode: <span className="font-medium">{mode}</span> <br />
            Independent Registration:{" "}
            <span className="font-medium">
              {independent ? "Allowed" : "Not Allowed"} <br />
            </span>
            Registrations:{" "}
            <span className="font-medium">
              {registrations ? (
                "Enabled"
              ) : (
                <span className="text-red-500">Closed</span>
              )}
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Image
            src={image}
            height={200}
            width={200}
            alt={name}
            className="md:mr-6"
          />
        </div>
      </div>
      <div className="text-accent light-disc pt-5 text-lg font-medium max-w-4xl whitespace-pre-line">
        {summary && summary}
      </div>
      <div>
        <ul className="marker:text-accent-light list-disc p-7 ">
          {description &&
            description.map((x, j) => (
              <li key={j} className="text-accent-light text-lg font-light">
                {x}
              </li>
            ))}
        </ul>
      </div>
      <div className="md:hidden border-dashed border border-gray-300 w-2/3 my-2"></div>
    </div>
  );
}
