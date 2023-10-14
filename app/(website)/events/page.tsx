"use client";

import { fetchEvents } from "@/util/data/Events";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import EventDescription from "@/components/EventDescription";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

const html2pdf = require("html2pdf.js");
import { PDFDocument } from "pdf-lib";

export default function EventsPage() {
  const {
    isLoading,
    error,
    data: Events,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  const [query, setQuery] = useState<string>("");

  const downloadPDF = async () => {
    const elem = document.getElementById("all-events");

    var opt = {
      margin: 10,
      filename: "Exun2023_Events.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { windowWidth: 1440, windowHeight: 810 },
      jsPDF: { format: "a4" },
      pagebreak: {
        mode: ["avoid-all", "css", "legacy"],
      },
    };

    var worker = html2pdf();
    const PDF = await worker
      .from(elem)
      .set(opt)
      .toContainer()
      .toCanvas()
      .toImg()
      .toPdf()
      .outputPdf();

    const pdfDoc = await PDFDocument.load(btoa(PDF));

    const pngImage = await pdfDoc.embedJpg(
      "data:image/jpeg;base64,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"
    );

    const page = pdfDoc.insertPage(0, [595.28, 841.89]);

    const pngDims = pngImage.scale(1);

    page.drawImage(pngImage, {
      x: (page.getWidth() - pngDims.width) / 2,
      y: (page.getHeight() - pngDims.height) / 2,
      width: pngDims.width,
      height: pngDims.height,
    });

    const pdfbytes = await pdfDoc.save();

    const blob = new Blob([pdfbytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "Exun2023_Events.pdf";
    link.click();
  };

  if (isLoading) return <Loading />;

  if (!Events || error) return <Error />;

  return (
    <div className="my-[4rem] mx-[2rem] md:mx-[9rem]">
      <div className="flex justify-between items-center flex-wrap">
        <div className="text-main text-5xl md:text-6xl font-semibold">
          Events
        </div>
        <button
          className="my-2 bg-main p-2 px-4 rounded-md text-white"
          onClick={downloadPDF}
        >
          Download as PDF
        </button>
      </div>
      <div className="input-group my-5">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            setQuery(e.target.value as string);
          }}
        />
      </div>
      <div id="all-events">
        {Events.filter((obj: { [key: string]: any }) =>
          Object.keys(obj).some(
            (key) =>
              typeof obj[key] === "string" &&
              obj[key].toLowerCase().includes(query.toLowerCase())
          )
        ).map(
          (
            {
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
            },
            i
          ) => (
            <EventDescription
              key={i}
              name={name}
              classes={classes}
              participants={participants}
              teams={teams}
              independent={independent}
              registrations={registrations}
              image={image}
              mode={mode}
              summary={summary}
              description={description}
            />
          )
        )}
      </div>
    </div>
  );
}
