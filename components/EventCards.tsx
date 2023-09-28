/**
 * Event card on the home screen
 */

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useScrollLock } from "@/util/hooks/use-scroll-lock";
import { IEvent, Groups } from "@/util/data/Events";

type CardParams = {
  text: string;
  image: string;
  className?: string;
  long?: boolean;
  Events: IEvent[];
};

export function Card({ text, image, className, long, Events }: CardParams) {
  const [showModal, setShowModal] = useState(false);
  const [lockScroll, unlockScroll] = useScrollLock();

  useEffect(() => {
    setShowModal(false);

    return () => unlockScroll();
  }, [unlockScroll]);
  useEffect(() => {
    showModal ? lockScroll() : unlockScroll();
  }, [showModal, lockScroll, unlockScroll]);

  const groupData: { [key: string]: string } = {
    "DomainSquare+": "ds",
    Build: "build",
    RoboKnights: "rk",
  };

  const data = Events.filter((x) => x.name === text)[0];

  return (
    <>
      <div
        className={`hover:shadow-md transition-all border-sub/20 border-solid border-[1px] flex ${
          long ? "flex-row sm:w-[31rem]" : "flex-col sm:w-[15rem]"
        } justify-center items-center p-8 m-2 w-[8rem] h-[8rem] sm:h-[15rem] cursor-pointer hover:mb-3 hover:h-[7.7rem] sm:hover:h-[14.7rem] transition-all ease-in ${className}`}
        onClick={() => setShowModal(!showModal)}
      >
        {long ? (
          <>
            <Image src={image} alt={text} height="150" width="150" />
            <div className="text-accent text-5xl mt-5 mx-2 text-semibold text-center">
              {text}
            </div>
          </>
        ) : (
          <>
            <Image src={image} alt={text} height="120" width="120" />
            <div className="text-accent text-sm sm:text-lg mt-2 sm:mt-5 sm:mx-2 text-semibold text-center">
              {text}
            </div>
          </>
        )}
      </div>
      {showModal && (
        <Modal
          name={text}
          description={
            data
              ? data.summary
              : Groups[groupData[text]]
              ? Groups[groupData[text]].summary
              : "No summary"
          }
          close={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export function HeaderCard() {
  return (
    <>
      <div className="header-card shadow-md border-sub/20 border-solid border-[1px] lg:rounded-md flex flex-col justify-center items-center p-8 m-2 w-[17rem] lg:w-[15rem] h-[4rem] lg:h-[31rem] rounded-2xl lg:rounded-ss-max lg:rounded-ee-max">
        <div className="text-2xl lg:text-7xl lg:mt-5 mx-3 font-bold lg:-rotate-90 text-white">
          Events
        </div>
      </div>
    </>
  );
}

export function Modal({
  name,
  description,
  close,
}: {
  name: string;
  description: string;
  close: any;
}) {
  return (
    <>
      <div className="z-[2] fixed top-0 left-0 h-screen w-full bg-[#C4C4C4]/[.12] rounded-lg drop-shadow-xl">
        <div className="flex flex-col h-full justify-center items-center">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex flex-row w-full items-end justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                onClick={close}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>

            <div className="flex flex-col justify-center items-center">
              <div className="text-main text-3xl font-semibold m-5">{name}</div>
              <div className="text-accent-light max-w-lg mx-5 font-light">
                {description}
              </div>
            </div>

            <div className="flex flex-row w-full items-end justify-end  my-5">
              <div className="text-accent-light font-medium text-md mx-5 cursor-pointer">
                <a href={`/events#${name.split(" ").join()}`}>Read more</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
