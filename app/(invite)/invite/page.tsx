"use client";

import useScroll from "@/util/hooks/use-scroll";
import { useQuery } from "@tanstack/react-query";
import Introduction from "@/components/Introduction";
import Rules from "@/components/Rules";
import { fetchEvents } from "@/util/data/Events";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

export default function LayoutPage() {
  const [inviteRef, scrollToInviteRef] = useScroll();
  const [introductionRef, scrollToIntroductionRef] = useScroll();
  const [eventsRef, scrollToEventsRef] = useScroll();
  const [exunTalkRef, scrollToExunTalkRef] = useScroll();
  const [prizesRef, scrollToPrizesRef] = useScroll();
  const [sudoRef, scrollToSudoRef] = useScroll();
  const [locusRef, scrollToLocusRef] = useScroll();
  const [datesRef, scrollToDatesRef] = useScroll();
  const [indivschoolRef, scrollToIndivschoolDatesRef] = useScroll();
  const [linksRef, scrollToLinksRef] = useScroll();
  const [exunClanRef, scrollToExunClanRef] = useScroll();

  const [rulesRef, scrollToRulesRef] = useScroll();
  const [generalRulesRef, scrollToGeneralRulesRef] = useScroll();
  const [regRulesRef, scrollToRegRulesRef] = useScroll();
  const [teacherRulesRef, scrollToTeacherRulesRef] = useScroll();
  const [discordRulesRef, scrollToDiscordRulesRef] = useScroll();
  const [exunTalksRulesRef, scrollToExunTalksRulesRef] = useScroll();
  const [prizesRulesRef, scrollToPrizesRulesRef] = useScroll();

  const {
    isLoading,
    error,
    data: events,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!events || error) {
    return <Error />;
  }

  return (
    <div>
      <div className="flex">
        <div className="hidden lg:flex fixed h-[80vh] w-[240px] justify-stretch px-5 overflow-y-auto">
          <div>
            <div className="my-4">
              <a
                className="block text-2xl text-main font-bold cursor-pointer"
                onClick={scrollToInviteRef}
              >
                Invite
              </a>
              <div className="ml-2">
                {[
                  { label: "Introduction", scroll: scrollToIntroductionRef },
                  { label: "Events", scroll: scrollToEventsRef },
                  { label: "Exun Talks", scroll: scrollToExunTalkRef },
                  {
                    label: "Prizes &amp; Overall Trophy",
                    scroll: scrollToPrizesRef,
                  },
                  { label: "Sudocrypt v13.0", scroll: scrollToSudoRef },
                  {
                    label: "Dates &amp; Exun Week</h2>",
                    scroll: scrollToDatesRef,
                  },
                  {
                    label: "Independent vs School Participation",
                    scroll: scrollToIndivschoolDatesRef,
                  },
                  {
                    label: "Links, Platforms and Registration",
                    scroll: scrollToLinksRef,
                  },
                  { label: "Exun Clan", scroll: scrollToExunClanRef },
                ].map(({ label, scroll }, i) => (
                  <a
                    className="block text-gray-600 cursor-pointer my-3 link leading-tight"
                    dangerouslySetInnerHTML={{ __html: label }}
                    key={i}
                    onClick={scroll}
                  />
                ))}
              </div>
            </div>
            <div className="my-4">
              <a
                className="block text-2xl text-main font-bold cursor-pointer"
                onClick={scrollToRulesRef}
              >
                Rules
              </a>
              <div className="ml-2">
                {[
                  {
                    label: "General Rules for Participants",
                    scroll: scrollToGeneralRulesRef,
                  },
                  {
                    label: "Registration Rules",
                    scroll: scrollToRegRulesRef,
                  },
                  {
                    label: "Accompanying Teacher / Coach",
                    scroll: scrollToTeacherRulesRef,
                  },
                  {
                    label: "Discord Server Rules",
                    scroll: scrollToDiscordRulesRef,
                  },
                  {
                    label: "Exun Talks Rules",
                    scroll: scrollToExunTalksRulesRef,
                  },
                  {
                    label: "Prizes &amp; Overall Trophy Rules",
                    scroll: scrollToPrizesRulesRef,
                  },
                ].map(({ label, scroll }, i) => (
                  <a
                    className="block text-gray-600 cursor-pointer my-3 link leading-tight"
                    dangerouslySetInnerHTML={{ __html: label }}
                    key={i}
                    onClick={scroll}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 2xl:ml-0 lg:ml-[200px] px-5 lg:p-0">
          <div className="max-w-[800px] w-full mx-auto">
            <div className="my-10 grid grid-cols-1 sm:grid-cols-2 gap-x-[50px]">
              <div className="w-full h-full flex flex-col items-stretch justify-center">
                <h1 className="text-main text-5xl font-extrabold">Exun 2023</h1>
                <p className="text-xl text-type-light">
                  Unique Events - Unique Memories
                </p>
              </div>
            </div>

            <Introduction
              inviteRef={inviteRef}
              introductionRef={introductionRef}
              eventsRef={eventsRef}
              exunTalkRef={exunTalkRef}
              prizesRef={prizesRef}
              sudoRef={sudoRef}
              locusRef={locusRef}
              datesRef={datesRef}
              indivschoolRef={indivschoolRef}
              linksRef={linksRef}
              exunClanRef={exunClanRef}
              events={events}
            />

            <Rules
              rulesRef={rulesRef}
              generalRulesRef={generalRulesRef}
              regRulesRef={regRulesRef}
              teacherRulesRef={teacherRulesRef}
              discordRulesRef={discordRulesRef}
              exunTalksRulesRef={exunTalksRulesRef}
              prizesRulesRef={prizesRulesRef}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
