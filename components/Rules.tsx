import React from "react";
import { IEvent } from "@/util/data/Events";

interface IRulesProps {
  rulesRef: React.MutableRefObject<HTMLDivElement>;
  generalRulesRef: React.MutableRefObject<HTMLDivElement>;
  regRulesRef: React.MutableRefObject<HTMLDivElement>;
  discordRulesRef: React.MutableRefObject<HTMLDivElement>;
  teacherRulesRef: React.MutableRefObject<HTMLDivElement>;
  exunTalksRulesRef: React.MutableRefObject<HTMLDivElement>;
  prizesRulesRef: React.MutableRefObject<HTMLDivElement>;
}

export default function Rules({
  rulesRef,
  generalRulesRef,
  regRulesRef,
  discordRulesRef,
  teacherRulesRef,
  exunTalksRulesRef,
  prizesRulesRef,
}: IRulesProps) {
  return (
    <div className="my-16 invite-introduction rules">
      <h1
        className="text-5xl font-bold text-accent"
        id="rules-h"
        ref={rulesRef}
      >
        Rules &amp; Regulations
      </h1>

      <div className="my-8" id="general-rules" ref={generalRulesRef}>
        <h2>General Instructions</h2>
        <ul>
          <li>
            Plagiarism is strictly prohibited for all events under Exun 2023 and
            may lead to disqualification from the specific event.
          </li>
          <li>
            Schools/Individuals must register for all events they want to
            participate in, late registration for an event will not be allowed
            in any circumstance.
          </li>
          <li>
            Participants must follow the{" "}
            <a href="https://exun.co/code">Exun 2023 Event Code</a>, and behave
            with appropriate conduct in all situations.
          </li>
          <li>
            No participant may be part of multiple teams for a single event.
          </li>
          <li>
            Due to a large number of participants, the school will not be
            responsible for the security and safety of any equipment.
          </li>
          <li>
            It will not be possible for us to provide accommodation or travel
            reimbursement for schools.
          </li>
        </ul>
      </div>

      <div className="my-8" id="registration-rules" ref={regRulesRef}>
        <h2>Registration Rules</h2>
        <ul>
          <li>
            Online registration shall remain open till 2nd November 2023,
            11:59PM IST for events without preliminary rounds, and close on the
            day of preliminary rounds for events which have one.
          </li>
          <li>
            The preliminary rounds’ deadline will differ so be sure to check
            {/* Link to dates page */}
            respective deadlines. Teams will not be allowed to edit their
            participants’ names after the preliminary round under any
            circumstances.
          </li>
          <li>
            <strong>School Registration:</strong> Schools can register their
            teams on <a href="https://reg.exun.co">reg.exun.co</a>. They are
            also eligible to win the overall prize.
          </li>
          <li>
            <strong>Note:</strong> School registration is open for both Indian
            schools and International schools. Participants can register
            independently as well, as outlined below.
          </li>
          <li>
            <strong>Independent Registration:</strong> Students can also
            register independently at{" "}
            <a href="https://exun.co/independentreg">exun.co/independentreg</a>.
            Independent participants can form teams among themselves, with
            students from the same or different schools/regions. Independent
            participants will compete for prizes in the same way as school
            teams, however they will not be eligible for the Exun 2023 overall
            winners trophy.
          </li>
          <li>
            Please note that not all events allow independent registration.
            Kindly check the Event Details for further information.
          </li>
          {
            // <li>
            //   <strong>Host School Registration:</strong>Students of Delhi Public
            //   School, R.K Puram can register to participate non-competitively{" "}
            //   <a href="https://exun.co/ncreg" target="_blank" rel="noreferrer">
            //     here
            //   </a>{" "}
            //   and participate in all Exun 2023 events. Students who place at 1st,
            //   2nd, 3rd positions will get a merit certificate and a shot at
            //   induction into Exun Clan, the foremost club of Delhi Public School,
            //   R. K. Puram, and at the high school level nationally.
            // </li>
          }
          <li>
            <strong>Note:</strong> Identification proof of all students(for
            independent) will be required to complete the registration form.
          </li>
          <li>
            There is no registration fee associated with registering for Exun
            2023.
          </li>
          <li>
            Any changes in the invite will be marked with <strong>**</strong>.
          </li>
        </ul>

        <div className="my-8" id="teacher-rules" ref={teacherRulesRef}>
          <h2>Accompanying teacher / coach</h2>
          <ul>
            <li>
              The participating school team must be accompanied by a teacher.
            </li>
            <li>
              They will be responsible for the conduct of the school team.
            </li>
            <li>
              They will ensure that the school team attends the Opening and
              Closing Ceremonies with the decorum that the event demands.
            </li>
          </ul>
        </div>

        <div className="my-8" id="discord-rules" ref={discordRulesRef}>
          <h2>Discord Server Rules</h2>
          <ul>
            <li>
              We will be setting up an{" "}
              <a href="https://exun.co/discord">Exun 2023 Discord server</a>.
            </li>
            <li>
              It is mandatory to join the server since it is the primary means
              of communication with the participants. There may be updates
              posted exclusively on Discord, including important details for the
              different rounds.
            </li>
            <li>
              The server is open to all participants, after the server is
              activated, all registered schools will be sent a school code,
              while independent participants will receive individual codes on
              their registered emails after the registration is completed. These
              codes are important and will be used for verifying participants on
              the server. The guidelines for this will be available on the Exun
              2023 server. All schools/individuals registered will receive the
              verification codes within 72 hours of registering via email or on
              their registration dashboards.
            </li>
            {/* TODO: link to code */}
            <li>
              Participants must follow the{" "}
              <a href="https://exun.co/code">Exun 2023 Event Code</a>, and
              behave in an appropriate manner.
            </li>
          </ul>
        </div>

        <div className="my-8" id="talks-rules" ref={exunTalksRulesRef}>
          <h2>Exun Talks Rules</h2>
          <p>
            Exun Week will include a special series of sessions called
            &quot;Exun Talks&quot; to give an enriching experience to all
            attendees, with speakers ranging from Exun and DPS RK Puram
            graduates to other experts working in various fields from around the
            world.
          </p>
          <ul>
            <li>
              Speakers will discuss their experiences with Computer Science and
              Technology, based on their diverse background and skill sets, with
              the aim of benefiting all and allowing everyone to interact and
              learn from them.{" "}
            </li>
            <li>
              You can find the list of speakers on our website. The Exun Talks
              schedule will be released soon as part of the Exun Week schedule.
              We request that if anyone is interested in receiving information
              and updates about the talks to register at{" "}
              <a href="https://exun.co/talkreg">exun.co/talkreg</a>.
            </li>
          </ul>
          <p>Guidelines to be followed during Exun Talks:</p>
          <ul>
            <li>
              Completely unrelated discussion from the topic being discussed by
              the speaker and host or information sharing in comments/live
              interactions will not be tolerated.
            </li>
            <li>
              Bullying or intimidating any other participants or speaker
              (everyone is here to learn) will not be tolerated as well.
            </li>
            <li>
              We request everyone to behave respectfully and be patient. Our
              speakers will get to your query and they will definitely address
              it.
            </li>
            <li>
              We encourage you to ask questions and interact well with speakers
              and other participants.
            </li>
          </ul>
        </div>
        <div className="my-8" id="prizes-rules" ref={prizesRulesRef}>
          <h2>Prizes & Overall Trophy Rules</h2>

          <ul>
            <li>
              The school which accumulates the maximum points, based on the
              points tally, will bag the prize ‘Exun 2023 Overall Trophy’.
            </li>
            <li>
              Any changes must be specified (mentioned) clearly and verified by
              the host school teacher incharge
            </li>
            <li>
              Participants represent their school and its nationality regardless
              of their current residence.
            </li>
            <li>
              In case of a tie for the overall position, the team which has more
              podium placements shall be awarded the trophy.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
