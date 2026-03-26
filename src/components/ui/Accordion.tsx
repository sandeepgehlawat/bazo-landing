"use client";

import { ReactNode, useState } from "react";
import { Sh2 } from "../typography";

type AccordionItemProps = {
  title: string;
  children: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
};

export function AccordionItem({ title, children, isOpen = false, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-dashed border-[#747572] last:border-b-0">
      <div
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 cursor-pointer text-left"
      >
        <Sh2 className="font-semibold">{title}</Sh2>
        <div className="w-7 h-7 rounded-full border border-primary bg-accent flex items-center justify-center shrink-0 ml-4">
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0C0C0C"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="pb-4 font-body text-text-muted text-[14px] leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

type AccordionProps = {
  items: { id:number, title: string; content: ReactNode }[];
  allowMultiple?: boolean;
  className?: string;
};

export default function Accordion({ items, allowMultiple = false, className = "" }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={className}>
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          title={item.title}
          isOpen={openIndexes.includes(i)}
          onToggle={() => handleToggle(i)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
