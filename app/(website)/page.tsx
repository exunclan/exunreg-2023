"use client";

import { Card, HeaderCard } from "@/components/EventCards";
import { Column, Row } from "@/components/Flex";
import EventData from "@/util/data/Events";

export default async () => {
  const Events = await EventData();

  return (
    <>
      {/*  Hero */}
      <div className="h-[75vh] w-full flex flex-col justify-center items-center">
        <div className="text-main text-center text-3xl sm:text-5xl font-semibold m-4">
          The biggest tech symposium of India
        </div>
        <div className="flex-1 bg-red"> {/* illustration */}</div>
        <div className="text-text text-sm sm:text-lg max-w-xs sm:max-w-2xl text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis,
          nostrum atque non iure reiciendis provident ab, hic officia eaque quos
          debitis, fugiat temporibus. Explicabo tempora sequi, placeat veniam
          eius necessitatibus cum sapiente sit
        </div>
      </div>

      {/* Event Cards */}
      <div className="hidden mt-[10rem] m-8 md:flex flex-col justify-center items-center">
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
                text="Locus"
                image="/locus.svg"
                className="rounded-b-max"
              />
              <Card
                Events={Events}
                text="exML"
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
            text="Robotics"
            image="/robotics.svg"
            className="rounded-max"
          />
          <Card
            Events={Events}
            text="SpaceTech"
            image="/Spacetech.svg"
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
                text="Girls in Tech"
                image="girls in tech.svg"
                className="rounded-t-max"
              />
            </Row>
          </Column>
          <Column>
            <Row>
              <Card
                Events={Events}
                text="Gaming"
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
                text="Open Quiz"
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

      <div className="sm:hidden flex flex-col justify-center items-center mt-[10rem] m-8">
        <HeaderCard />
        <div className="flex flex-row flex-wrap justify-center items-center ">
          {Events.map(({ name, image }, i) => (
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
};
