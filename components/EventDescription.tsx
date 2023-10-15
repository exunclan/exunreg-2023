/**
 * An event's section on the `/events` route
 */

"use client";

import Image from "next/image";

export default function EventDescription({
  idx,
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
  idx: number;
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
    <>
      <div
        id={name.split(" ").join()}
        className="flex flex-col justify-center items-center md:items-start pt-10 md:my-10"
      >
        <div className="flex flex-col justify-between w-full">
          <div className="flex flex-col justify-center items-center md:items-start">
            <table className="border border-main table-auto border-collapse">
              <tr className="w-full h-full">
                <td className="md:w-[30rem] border-r border-r-main">
                  <table className="p-3 h-full w-full table-auto border-collapse">
                    <tr>
                      <td className="text-main font-bold text-2xl md:text-4xl p-2">
                        <div className="flex">
                          [{idx}] {name}
                          <div className="visible md:hidden">
                            <Image
                              src={image}
                              height={100}
                              width={100}
                              alt={name}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <table className="p-2 border-t border-t-main w-full table-auto border-collapse border-spacing-2 text-xs md:text-[.9rem] text-accent">
                          <tr className="border-b border-b-accent-light">
                            <td className="border-r border-r-main p-1 bg-[#F3F3F3]">
                              Eligiblity
                            </td>
                            <td className="p-1">
                              {classes === "Open"
                                ? "Open for all age groups"
                                : `Students of classes ${
                                    classes.split("-")[0]
                                  } to ${classes.split("-")[1]}`}
                            </td>
                          </tr>

                          <tr className="border-b border-b-accent-light">
                            <td className="border-r border-r-main p-1 bg-[#F3F3F3]">
                              Maximum Teams per school
                            </td>
                            <td className="p-1">
                              {teams === -1 ? "∞" : teams}
                            </td>
                          </tr>

                          <tr className="border-b border-b-accent-light">
                            <td className="border-r border-r-main p-1 bg-[#F3F3F3]">
                              Maximum Participants per school
                            </td>
                            <td className="p-1">{participants}</td>
                          </tr>

                          <tr className="border-b border-b-accent-light">
                            <td className="border-r border-r-main p-1 bg-[#F3F3F3]">
                              Mode
                            </td>
                            <td className="p-1">
                              {mode === "Hybrid"
                                ? "Online - Offline (Hybrid)"
                                : mode}
                            </td>
                          </tr>

                          <tr className="border-b border-b-accent-light">
                            <td className="border-r border-r-main p-1 bg-[#F3F3F3]">
                              {" "}
                              Independent Registration
                            </td>
                            <td className="p-1">
                              {independent ? (
                                <span className="text-green-600">
                                  ✔︎ Allowed
                                </span>
                              ) : (
                                <span className="text-red-600">
                                  ❌ Not Allowed
                                </span>
                              )}
                            </td>
                          </tr>

                          <tr>
                            <td className="border-r border-r-main p-1 bg-[#F3F3F3]">
                              Registration
                            </td>
                            <td className="p-1">
                              {registrations ? (
                                <span className="text-green-600">
                                  ✔︎ Enabled
                                </span>
                              ) : (
                                <span className="text-red-600">
                                  ❌ Disabled{" "}
                                </span>
                              )}
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>

                <td className="hidden md:flex">
                  <Image src={image} height={200} width={200} alt={name} />
                </td>
              </tr>
            </table>
          </div>
          <div className="text-accent light-disc pt-5 text-md font-medium max-w-4xl whitespace-pre-line">
            {summary && summary}
          </div>
          <div>
            <ul className="marker:text-accent-light list-disc p-7">
              {description &&
                description.map((x, j) => (
                  <li key={j} className="text-accent-light text-md font-light">
                    {x}
                  </li>
                ))}
            </ul>
          </div>
          <div className="md:hidden border-dashed border border-gray-300 w-2/3 my-2"></div>
        </div>
      </div>
    </>
  );
}
