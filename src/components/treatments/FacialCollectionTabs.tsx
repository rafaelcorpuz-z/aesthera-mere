"use client";

import { useId, useRef, useState } from "react";
import TreatmentCard from "@/components/treatments/TreatmentCard";
import type { Treatment } from "@/data/treatments";

type FacialCollection = {
  title: string;
  treatments: Treatment[];
};

export default function FacialCollectionTabs({
  collections,
  basePath,
}: {
  collections: FacialCollection[];
  basePath: string;
}) {
  const id = useId();
  const [activeTitle, setActiveTitle] = useState(collections[0]?.title ?? "");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeCollection = collections.find((collection) => collection.title === activeTitle) ?? collections[0];

  function selectTab(index: number) {
    const nextIndex = (index + collections.length) % collections.length;
    setActiveTitle(collections[nextIndex].title);
    tabRefs.current[nextIndex]?.focus();
  }

  if (!activeCollection) return null;

  return (
    <div>
      <div
        role="tablist"
        aria-label="Facial collections"
        className="flex border-b border-[#80755F]/25"
      >
        {collections.map((collection, index) => {
          const active = collection.title === activeCollection.title;
          const tabId = `${id}-tab-${index}`;
          const panelId = `${id}-panel-${index}`;

          return (
            <button
              key={collection.title}
              ref={(node) => { tabRefs.current[index] = node; }}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={panelId}
              tabIndex={active ? 0 : -1}
              onClick={() => setActiveTitle(collection.title)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  selectTab(index + 1);
                } else if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  selectTab(index - 1);
                } else if (event.key === "Home") {
                  event.preventDefault();
                  selectTab(0);
                } else if (event.key === "End") {
                  event.preventDefault();
                  selectTab(collections.length - 1);
                }
              }}
              className={`relative flex min-h-16 flex-1 items-center justify-center px-3 py-4 text-center font-montserrat text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 sm:px-6 sm:text-xs ${active ? "text-[#4C5534]" : "text-[#80755F] hover:text-[#4F6442]"}`}
            >
              {collection.title}
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 -bottom-px h-0.5 bg-[#4C5534] transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0"}`}
              />
            </button>
          );
        })}
      </div>

      {collections.map((collection, index) => {
        const active = collection.title === activeCollection.title;
        return (
          <div
            key={collection.title}
            id={`${id}-panel-${index}`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${index}`}
            hidden={!active}
            className="pt-8 md:pt-10"
          >
            <div className="mb-7 flex items-end justify-between gap-5">
              <h3 className="font-seasons text-[clamp(2.25rem,4vw,3.5rem)] leading-tight text-[#4C5534]">{collection.title}</h3>
              <p className="shrink-0 font-montserrat text-[10px] uppercase tracking-[0.14em] text-[#80755F]">{collection.treatments.length} treatments</p>
            </div>
            <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
              {collection.treatments.map((treatment) => (
                <TreatmentCard key={treatment.slug} treatment={treatment} href={`${basePath}/${treatment.slug}`} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
