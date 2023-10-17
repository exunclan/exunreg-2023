import React from "react";
import { IEvent } from "@/util/data/Events";

interface IIntroductionProps {
  inviteRef: React.MutableRefObject<HTMLDivElement>;
  eventsRef: React.MutableRefObject<HTMLDivElement>;
  exunTalkRef: React.MutableRefObject<HTMLDivElement>;
  prizesRef: React.MutableRefObject<HTMLDivElement>;
  locusRef: React.MutableRefObject<HTMLDivElement>;
  sudoRef: React.MutableRefObject<HTMLDivElement>;
  datesRef: React.MutableRefObject<HTMLDivElement>;
  indivschoolRef: React.MutableRefObject<HTMLDivElement>;
  linksRef: React.MutableRefObject<HTMLDivElement>;
  exunClanRef: React.MutableRefObject<HTMLDivElement>;
  introductionRef: React.MutableRefObject<HTMLDivElement>;
  events: IEvent[];
}

export default function Introduction({
  inviteRef,
  eventsRef,
  exunTalkRef,
  prizesRef,
  sudoRef,
  datesRef,
  indivschoolRef,
  linksRef,
  exunClanRef,
  introductionRef,
  events,
}: IIntroductionProps) {
  return (
    <div className="my-16 invite-introduction">
      <h1 className="text-4xl font-bold text-accent" ref={inviteRef}>
        Invite
      </h1>
      <p>
        You can always return to this page to have a quick recap on the event,
        and how it works.
        <br />
        If your school did not get official email yet, please submit your
        school's email to exun@dpsrkp.net along with school name for the
        Official Invitation for the Exun 2023.
      </p>

      <div className="my-8" id="symposium-introduction" ref={introductionRef}>
        <h2>Introduction to the Exun 2023 Symposium</h2>
        <p>
          Exun 2023 is our 28th annual international technology symposium hosted
          by and for high school students, which will be held during Exun Week
          from October 30th - November 5th, 2023. Every year, STEM enthusiasts
          from India and beyond arrive at our symposium, both battling it out
          and coming together to have some of the most memorable and impactful
          experiences of their lives, deeply engaging with and celebrating the
          essence of technology on the way.{" "}
        </p>
        <p>
          So, who should participate in Exun 2023? If you are someone, or know
          someone, who enjoys problem solving, loves expressing themselves
          digitally, has an interest in science and technology or simply wants
          to learn and explore, we can guarantee you’ll find plenty of quality
          opportunities, all in one place. Are you excited yet? We hope you are
          and we will gladly be looking forward to having you at our symposium!
          But wait, there is more you should know!
        </p>
      </div>

      <div className="my-8" id="events" ref={eventsRef}>
        <h2>Events</h2>
        <table className="w-full border-collapse">
          <tr className="text-left">
            <th className="border p-2"></th>
            <th className="border p-2">Event</th>
            <th className="border p-2">Classes</th>
            <th className="border p-2">Teams per School</th>
            <th className="border p-2">Students per Team</th>
          </tr>
          {events.map((event, i) => (
            <tr key={i}>
              <td className="border p-2">{i + 1}</td>
              <td className="border p-2">{event.name}</td>
              {<td className="border p-2">{event.classes}</td>}
              <td className="border p-2">
                {event.teams === -1 ? "∞" : event.teams}
              </td>
              <td className="border p-2">{event.participants}</td>
            </tr>
          ))}
        </table>
        <p>
          Let&apos;s start with a highlight: STEM competitions; called events,
          we have over 15 in disciplines from competitions in creative fields
          such as Web & App development to 2D & 3D Design (Build), to technical
          fields like Machine Learning (ExML), Computational Linguistics (Turing
          Test), and Competitive Programming (CP).
        </p>
        {/* <p>
          Are you interested in some other kinds of events as well? With our
          wide array of options, we&apos;ve got you covered! We have the Girls
          in Tech event, where participants will learn a new technical skill
          through workshops and then participate in a contest, the SpaceTech
          event, in collaboration with the New Delhi Space Society, for
          interesting practical applications of engineering and problem solving
          in space scenarios. We also have the Quiz, Crossword, and Surprise
          events for the inquisitive.
        </p> */}
        <p>
          Are you interested in some other kinds of events as well? With our
          wide array of options, we&apos;ve got you covered! We have the Girls
          in Tech event, where participants will learn a new technical skill
          through workshops and then participate in a contest. We also have the
          Quiz, Crossword, and Surprise events for the inquisitive.
        </p>
        <p>
          We have also teamed up with other clubs in our school to offer you a
          chance to show off your skillset: DomainSquare+, the Gaming society of
          our school, with {events.filter((x) => x.group === "ds").length}{" "}
          renowned and remarkable events where you can put your gaming skills to
          the absolute test; Roboknights, who are hosting{" "}
          {events.filter((x) => x.group === "rk").length} events based on
          robotics and engineering concepts; and CubXL, who are organizing{" "}
          {events.filter((x) => x.group === "cubxl").length} events with
          exciting cubing prizes.
        </p>
        <p>
          Please check our{" "}
          <a href="https://reg.exunclan.com/invite/events">Events</a> page for
          details of the full spectrum of events Exun 2023 has to offer. Most
          events will have preliminary rounds which will be conducted during the
          Exun Week (October 30th - November 5th) while other events will fully
          happen onsite on November 4-5, so be sure to check that out!
        </p>
      </div>

      {/* <div className="my-8" id="talks" ref={exunTalkRef}>
        <h2>Exun Talks</h2>
        <p>
          Every year, we host a series of interactive webinars and talks during
          Exun Week. These are conducted by professionals on a myriad of topics,
          from the <strong>ubiquity of graph theory</strong> to the future in{" "}
          <strong>automation</strong>. With the constant interaction, it is a
          fantastic experience for everyone involved! You can check out the
          previous Exun Talks <a href="https://exun.co/talks">here</a>.
        </p>
        <p>
          Last year, we had talks on Neobanks, Cloud Computing, Martian Economy
          and many more interesting topics.
        </p>
        <p>
          This year, we have an excellent array of speakers, so we hope to see
          you there!
        </p>
        <p>
          We request that anyone interested in receiving information and updates
          about the Exun Talks to register at{" "}
          <a href="https://exun.co/talkreg">exun.co/talkreg</a>. Keep checking
          our <a href="https://facebook.com/ExunClan">Facebook Page</a> as well!
        </p>
      </div> */}

      <div className="my-8" id="prizes" ref={prizesRef}>
        <h2>Prizes &amp; Overall Trophy</h2>

        <div className="my-3">
          <h3 className="text-lg text-gray-600 font-bold">Event Prizes</h3>
          <p>
            We have different <strong>prizes</strong> available for teams
            (individual or multiple participants) who win 1st, 2nd, and 3rd
            places, along with special prizes provided by our event partners.
          </p>
        </div>
        <div className="my-3">
          <h3 className="text-lg text-gray-600 font-bold">Overall Trophy</h3>
          <p>
            Podium points from each win will contribute towards a school’s
            overall points tally for Exun 2023 (further details on breakdown are
            given on our Events page). The school with the most points will win
            the coveted Exun 2023 Overall, and be awarded our specially-designed{" "}
            <strong>Exun 2023 Overall Trophy!</strong>
          </p>
        </div>
      </div>

      <div className="my-8" id="sudo" ref={sudoRef}>
        <h2>Sudocrypt v13.0</h2>
        <p>
          Exun Clan’s <strong>flagship event</strong> of the year, we present
          Sudocrypt 13.0 this year, our annual{" "}
          <strong>international cryptic hunt</strong>. With thousands of
          participants and an exciting new system of game mechanics each year,
          levels are rewarding and sometimes challenging. Keep a lookout for the
          announcement and format for this year’s hunt (to be out soon)!
          <div className="mt-3">
            However, first, <strong>what is a “cryptic hunt”?</strong> To put it
            simply: Cryptic hunts are the online equivalent of treasure hunts
            and require you to hunt the internet for clues to solve questions.
            For more information, you can check out this resource.
          </div>
        </p>
      </div>

      {
        // <div className="my-8" id="sudocrypt" ref={locusRef}>
        //   <h2>Locus</h2>
        //   <p>
        //     Being introduced this year for the very first time, we present Locus.
        //     In this event, students of every school will complete a{" "}
        //     <strong>variety of mini-tasks</strong>, in fields even more diverse
        //     than our main events. These tasks will contribute to a Locus points
        //     tally, and the school with the highest accumulated points will be
        //     crowned as <strong>Locus Champions!</strong>
        //   </p>
        // </div>
      }

      <div className="my-8" id="dates" ref={datesRef}>
        <h2>Dates &amp; Exun Week</h2>
        <p>
          We refer to the days including and from October 30th to November 5th
          as Exun Week: Be sure to mark your calendars!
        </p>
        <table className="w-full border-collapse">
          <tr>
            <td className="border p-2">Last date for Online registration</td>
            <td className="border p-2" colSpan={2}>
              <strong>29th October, 2023</strong>
            </td>
          </tr>
          <tr>
            <td className="border p-2">Online Events and Prelims</td>
            <td className="border p-2" colSpan={2}>
              <strong>30th October to 3rd November, 2023</strong>
            </td>
          </tr>
          <tr>
            <td className="border p-2">Onsite Events</td>
            <td className="border p-2" colSpan={2}>
              <strong>4th and 5th November, 2023</strong>
            </td>
          </tr>
          <tr>
            <td className="border p-2"></td>
            <td className="border p-2">
              <strong>4th November</strong>
            </td>
            <td className="border p-2">
              <strong>5th November</strong>
            </td>
          </tr>
          <tr>
            <td className="border p-2">Onsite Events Timings</td>
            <td className="border p-2">
              <strong>9AM - 4PM</strong>
            </td>
            <td className="border p-2">
              <strong>8AM - 3PM</strong>
            </td>
          </tr>
          <tr>
            <td className="border p-2">Onsite Events Reporting Time</td>
            <td className="border p-2">
              <strong>8:30AM</strong>
            </td>
            <td className="border p-2">
              <strong>7:30AM</strong>
            </td>
          </tr>
        </table>
      </div>

      <div className="my-8" id="independent-vs-school" ref={indivschoolRef}>
        <h2>Independent vs School Participation</h2>
        <p>
          Participants can either represent their respective schools (counted as
          “<strong>school participation</strong>”), or represent a team or go
          themselves for an event without affiliation to any school (counted as
          “<strong>independent participation</strong>”) with a customized team
          name.
        </p>
        {/* <p>
          Independent participation will only be allowed for events that will be
          completely online, i.e., Sudocrypt v13.0, SpaceTech, ExML, Turing
          Test, Build: Unreality, and Competitive Programming Prelims.
        </p> */}
        <p>
          Independent participation will only be allowed for events that will be
          completely online, i.e., Sudocrypt v13.0, ExML, Turing Test, Build:
          Unreality, and Competitive Programming Prelims.
        </p>
        <p>
          Points won by teams and individuals under school participation will be
          counted towards their overall total points tally. Points will not be
          passed down to the nearest school team if independent participation
          takes place.
        </p>
        <p>
          Participants can be part of both school and independent participation
          teams, as long as the teams do not participate in the same event.
        </p>
        {
          // <p>
          //   Students of Delhi Public School, R.K Puram are not eligible only for
          //   non-competitive participation in all events and Exun 2023 related
          //   activities. Participants who place at 1st, 2nd, 3rd positions will
          //   receive a merit certificate, and a chance to get inducted into Exun
          //   Clan.
          // </p>
        }
      </div>

      <div className="my-8" id="links" ref={linksRef}>
        <h2>Links, Platforms and Registration</h2>
        <p>
          We will be setting up an{" "}
          <a
            href="https://discord.gg/cr8KtvuqEy"
            target="_blank"
            rel="noreferrer"
          >
            Exun 2023 Discord server
          </a>{" "}
          which will serve as the primary mode of communication. Here, all
          information for individual events will be provided to participants and
          they can ask questions and have their queries resolved. It will
          receive the quickest responses and updates of all our communication
          channels, and many updates will be exclusively delivered via this
          platform, so participants must join the official server after
          registration.
        </p>
        <p>
          Registration can be done at{" "}
          <a href="https://reg.exunclan.com/">reg.exunclan.com</a>. Only a
          single representative needs to register on behalf of a team (if
          independent) and school (if participating with your school), where
          they will have to verify their emails and be verified by us to be
          legitimate participants. They will then be notified of successful
          registration and receive links and instructions for their group
          joining the Discord server.
        </p>
        <p>
          Participants are strongly encouraged to complete registration at the
          earliest, as they must be registered before the respective deadlines
          to participate in events with preliminary rounds.{" "}
        </p>
        <p>
          You may also use the following links to receive announcements and
          connect with us or ask us any questions at:
        </p>
        <ul className="list-disc ml-10">
          <li>
            <a href="http://exun.co/queries">Queries Form</a>
          </li>
          <li>
            <a href="https://facebook.com/ExunClan">Facebook</a>
          </li>
          <li>
            <a href="https://lnexun.com">ln(Exun)</a>
          </li>
          <li>
            <a href="https://instagram.com/exunclan">Instagram</a>
          </li>
        </ul>
      </div>

      <div className="my-8" id="exun-clan" ref={exunClanRef}>
        <h2>Exun Clan</h2>
        <p>
          Last but certainly not the least, we introduce ourselves. Founded in
          1991, Exun Clan is the Computer Science and technology club of Delhi
          Public School, R.K. Puram, and the{" "}
          <strong>premier student-run STEM club in the country</strong>. Our
          motto, <strong>“We, not I”</strong>, emphasizes our dedication to the
          principles of teamwork, sharing knowledge, and the spirit of
          collaboration.
        </p>
        <p>
          For the past couple of decades, we have set the bar for technology
          competitions in India with new and exciting additions each year and
          then surpassed it ourselves, striving to continuously improve the
          symposium, club and ourselves. Examples include Exun Talks, our Girls
          in Tech initiative, and novel event concepts.
        </p>
      </div>
    </div>
  );
}
