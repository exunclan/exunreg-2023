"use client";

import { Card, HeaderCard } from "@/components/EventCards";
import { Column, Row } from "@/components/Flex";
import { fetchEvents, Images, Groups } from "@/util/data/Events";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import Error from "@/components/Error";
import Image from "next/image";

export default function HomePage() {
  const {
    isLoading,
    data: Events,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!Events || error) {
    return <Error />;
  }

  const groupEvents = Events.filter((x) => !!x.group);
  const groups = Array.from(new Set(groupEvents.map((x) => x.group)));
  const filteredEvents = Events.filter((x) => !x.group);

  return (
    <>
      {/* Hero */}
      <div className="h-[75vh] w-full flex flex-col justify-center items-center">
        <div className="flex md:flex-col flex-col-reverse justify-center items-center">
          <div className="text-main text-center text-3xl sm:text-5xl font-semibold m-4">
            The biggest tech symposium of India
          </div>
          <Image
            src="/illustration.png"
            alt="Illustration"
            width="400"
            height="400"
            className="w-40 sm:w-[400px]"
          />
        </div>
        <div className="text-accent-light text-sm sm:text-lg max-w-xs sm:max-w-3xl text-center">
          Exun 2023, a plethora of events and a profusion of memories, awaits
          you. The 28th iteration of Exun Clan's annual international technology
          symposium is being organized on 4th and 5th November, with the
          preliminary rounds starting from 27th October. Budding from the
          success of Exun 2022 with over 22,000 participants both from India and
          across the globe, we hope Exun 2023 scales to new heights. Check out
          our list of events below, with something for every variety of tech
          enthusiasts!
        </div>
      </div>

      {/* Event Cards - Desktop */}
      <div className="hidden mt-[10rem] m-8 lg:flex flex-col justify-center items-center">
        <Row>
          <HeaderCard />
          <Column>
            <Row>
              <Card
                Events={Events}
                text="Sudocrypt"
                image="/sudocrypt.svg"
                className="rounded-b-max"
              />
              <Card
                Events={Events}
                text="Turing Test"
                image="/Turing.svg"
                className="rounded-b-max"
              />
              <Card
                Events={Events}
                text="ExML"
                image="/exML.svg"
                className="rounded-se-max rounded-es-max"
              />
            </Row>
            <Row>
              <Card
                Events={Events}
                text="Group Discussion"
                image="/GD.svg"
                className="rounded-max"
              />
              <Card
                Events={Events}
                text="Build"
                image="/Build.svg"
                className="rounded-l-max"
                long
              />
            </Row>
          </Column>
        </Row>
        <Row>
          <Card
            Events={Events}
            text="Competitive Programming"
            image="/CP.svg"
            className="rounded-r-max"
          />
          <Card
            Events={Events}
            text="RoboKnights"
            image="/robotics.svg"
            className="rounded-max"
          />
          <Card
            Events={Events}
            text="Audio Production"
            image="/audio.png"
            className="rounded-max"
          />
          <Card
            Events={Events}
            text="Hardware"
            image="/hardware.svg"
            className="rounded-l-max"
          />
        </Row>
        <Row>
          <Column>
            <Card
              Events={Events}
              text="Surprise"
              image="/surprise.svg"
              className="rounded-r-max"
              long
            />
            <Row>
              <Card
                Events={Events}
                text="Crossword"
                image="cross.svg"
                className="rounded-se-max rounded-es-max"
              />
              <Card
                Events={Events}
                text="Girls In Tech"
                image="girls in tech.svg"
                className="rounded-t-max"
              />
            </Row>
          </Column>
          <Column>
            <Row>
              <Card
                Events={Events}
                text="DomainSquare+"
                image="/gaming.svg"
                className="rounded-max"
              />
              <Card
                Events={Events}
                text="Junior Quiz"
                image="/junior quiz.svg"
                className="rounded-l-max"
              />
            </Row>
            <Row>
              <Card
                Events={Events}
                text="Quiz"
                image="/open quiz.svg"
                className="rounded-t-max"
              />
              <Card
                Events={Events}
                text="CubXL"
                image="/cubxl.svg"
                className="rounded-ss-max rounded-ee-max"
              />
            </Row>
          </Column>
        </Row>
      </div>

      {/* Event Cards - Mobile */}
      <div className="lg:hidden flex flex-col justify-center items-center mt-[10rem] m-8">
        <HeaderCard />
        <div className="flex flex-row flex-wrap justify-center items-center ">
          {groups.map((name, i) => (
            <Card
              Events={Events}
              key={i}
              text={Groups[name].name}
              image={Images[name]}
              className="rounded-2xl"
            />
          ))}
          {filteredEvents.map(({ name, image }, i) => (
            <Card
              Events={Events}
              key={i}
              text={name}
              image={image}
              className="rounded-2xl"
            />
          ))}
        </div>
      </div>
    </>
  );
}
