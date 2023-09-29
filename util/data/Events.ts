/**
 * Function to fetch the data from Sanity
 */

import { createClient, groq } from "next-sanity";

const client = createClient({
  apiVersion: "2023-09-11",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: false,
});

export const Images: { [key: string]: string } = {
  // groups
  build: "/Build.svg",
  rk: "/robotics.svg",
  ds: "/gaming.svg",
  cubxl: "/cubxl.svg",

  // events
  Sudocrypt: "/sudocrypt.svg",
  exML: "/exML.svg",
  "Group Discussion": "/GD.svg",
  "Competitive Programming": "/CP.svg",
  SpaceTech: "/Spacetech.svg",
  Hardware: "/hardware.svg",
  Surprise: "/surprise.svg",
  Crossword: "/cross.svg",
  "Girls In Tech": "/girls in tech.svg",
  "Junior Quiz": "/junior quiz.svg",
  Quiz: "/open quiz.svg",
  "Turing Test": "/Turing.svg",
};

export const Groups: { [key: string]: { name: string; summary: string } } = {
  ds: {
    name: "DomainSquare+",
    summary: "",
  },
  build: {
    name: "Build",
    summary: "",
  },
  rk: {
    name: "RoboKnights",
    summary: "",
  },
  cubxl: {
    name: "CubXL",
    summary: "",
  }
};

export interface IEvent {
  name: string;
  classes: string;
  participants: number;
  teams: number;
  independent: boolean;
  registrations: boolean;
  image: string;
  summary: string;
  group: string;
  description: string[];
}

// Extend the IEvent interface but without the 'image' property
interface IData extends Omit<IEvent, "image"> {
  _id: string;
  _type: string;
  _updatedAt: string;
  _createdAt: string;
  _rev: string;
}

// Fetch the data from Sanity

export const fetchEvents = async (): Promise<IEvent[]> => {
  const data = await client.fetch<IData[]>(groq`*[_type=="event"]`);
  return new Promise((resolve, reject) => {
    resolve(
      data.map((x) => {
        let image =
          Images[x.name] === undefined ? Images[x.group] : Images[x.name];

        return {
          description: x.description,
          registrations: x.registrations,
          classes: x.classes,
          name: x.name,
          participants: x.participants,
          teams: x.teams,
          summary: x.summary,
          independent: x.independent,
          group: x.group,
          image,
        };
      })
    );
  });
};
