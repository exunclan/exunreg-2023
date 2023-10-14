"use client";

import { fetchEvents } from "@/util/data/Events";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import EventDescription from "@/components/EventDescription";
import Loading from "@/components/Loading";
import Error from "@/components/Error";

import { PDFDocument } from "pdf-lib";
import { AiOutlineLoading } from "react-icons/ai";

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
  const [isDownloadClicked, setIsDownloadClicked] = useState<boolean>(false);

  useEffect(() => {
    const downloadPDF = async () => {
      const html2pdf = (await import("../../../components/html2pdf")).default;

      const elem = document.getElementById("all-events");
      var opt = {
        margin: 19,
        filename: "Exun2023_Events.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { windowWidth: 1440, windowHeight: 810 },
        jsPDF: { unit: "pt", format: [595.28, 740] },
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

      const pngImage = await pdfDoc.embedPng(
        "data:image/png;base64,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"
      );

      const page = pdfDoc.insertPage(0, [595.28, 740]);

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
      link.href = URL.createObjectURL(blob);
      link.download = "Exun2023_Events.pdf";
      link.click();
      setIsDownloadClicked(false);
    };

    if (isDownloadClicked) {
      downloadPDF();
    }
  }, [isDownloadClicked]);

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
          onClick={() => setIsDownloadClicked(true)}
        >
          {isDownloadClicked ? (
            <AiOutlineLoading className="animate-spin m-1 mx-3" />
          ) : (
            "Download as PDF"
          )}
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
            <>
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
              <div className="html2pdf__page-break"></div>
            </>
          )
        )}
      </div>
    </div>
  );
}
