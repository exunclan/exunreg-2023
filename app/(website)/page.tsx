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

      <div className="flex flex-col justify-center items-center" style={{width:"100vw",height:"10vh",scale:1.25}}>
        <button
            className="my-2 bg-main p-2 rounded-md text-white"
            onClick={()=>{window.open("https://docs.google.com/document/u/6/d/e/2PACX-1vT1q_W-T6QnQLEm5B3onr7QDfLVOa5yglBAsPYbuA0JCHFQmQZDtteOpQNcn5eAm4ovhemXul6kxaII/pub","_blank")}}
          >
          Event Details
        </button>
      </div>
    </>
  );
}
