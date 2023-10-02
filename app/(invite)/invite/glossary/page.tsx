"use client";

import { useState } from "react";
import terms from "@/util/data/Glossary";

export default function GlossaryPage() {
  const [query, setQuery] = useState<string>("");

  return (
    <div className="max-w-[990px] w-full mx-auto">
      <div className="mx-auto w-full">
        <h1 className="text-4xl font-bold text-main my-10">Glossary</h1>
        <div className="input-group my-5">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              setQuery(e.target.value as string);
            }}
          />
        </div>

        <div className="grid gap-[30px] grid-cols-1 sm:grid-cols-2">
          {Object.keys(terms)
            .filter((x) => {
              return terms[x].toLowerCase().includes(query.toLowerCase());
            })
            .map((x, i) => (
              <div
                className="p-6 bg-white rounded-lg shadow-sm flex flex-col"
                key={i}
              >
                <div className="text-xl font-bold text-accent">{x}</div>
                <div className="mt-3 text-type-lighk">{terms[x]}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
