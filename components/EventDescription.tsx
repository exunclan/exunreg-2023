"use client";

import Image from "next/image";

export default function EventDescription({
  name,
  classes,
  participants,
  teams,
  independant,
  registrations,
  image,
  description,
}: {
  name: string;
  classes: string;
  participants: number;
  teams: number;
  independant: boolean;
  registrations: boolean;
  image: string;
  description: string[];
}) {
  return (
    <div className="flex flex-col justify-center items-start my-10">
      <div
        id={name.split(" ").join()}
        className="flex flex-row justify-between items-center w-full"
      >
        <div className="flex flex-col justify-center items-start">
          <div className="text-sub font-bold text-4xl my-4">{name}</div>
          <div className="text-sub text-lg">
            Open for classes <span className="font-medium">{classes}</span>{" "}
            <br />
            Maximum teams per school:{" "}
            <span className="font-medium">{teams}</span> <br />
            Maximum participants per team:{" "}
            <span className="font-medium">{participants}</span> <br />
            Indepependant Registration:{" "}
            <span className="font-medium">
              {independant ? "Allowed" : "Not Allowed"} <br />
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
  );
}
