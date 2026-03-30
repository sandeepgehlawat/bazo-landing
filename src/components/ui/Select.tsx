"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowDown01Icon, Checkbox } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick01Icon } from "@hugeicons/core-free-icons";
import { PSm } from "../typography";

type SelectVariant = "default" | "outline" | "ghost";
type SelectSize = "default" | "sm" | "md" | "lg";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  options: SelectOption[];
  value?: string[];
  onChange?: (value: string[]) => void;
  variant?: SelectVariant;
  selectSize?: SelectSize;
  label?: string;
  placeholder?: string;
  error?: string;
  className?: string;
  multiple?: boolean;
  maxSelect?: number;
};

const defaultStyle =
  "w-full font-body font-normal transition outline-none cursor-pointer";

const variantStyles: Record<SelectVariant, string> = {
  default: "text-primary",
  outline: "bg-transparent text-primary border border-border-disabled input-shadow",
  ghost: "bg-transparent text-primary border-b border-[#D9DBD5] rounded-none",
};

const sizeStyles: Record<SelectSize, string> = {
  default: "rounded-lg md:rounded-[10px]",
  sm: "px-2.5 py-2 text-sm rounded-lg",
  md: "h-10 px-4 text-sm rounded-[10px]",
  lg: "h-12 px-5 text-base rounded-xl",
};

export default function Select({
  options,
  value = [],
  onChange,
  variant = "default",
  selectSize = "default",
  label,
  placeholder = "Select",
  error,
  className = "",
  multiple = true,
  maxSelect,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (optionValue: string) => {
    if (!multiple) {
      onChange?.(value.includes(optionValue) ? [] : [optionValue]);
      setIsOpen(false);
      return;
    }
    if (value.includes(optionValue)) {
      onChange?.(value.filter((v) => v !== optionValue));
      return;
    }
    if (maxSelect && value.length >= maxSelect) return;
    onChange?.([...value, optionValue]);
  };

  const selectedLabels = options
    .filter((opt) => value.includes(opt.value))
    .map((opt) => opt.label);

  // const displayText = selectedLabels.length > 0 ? selectedLabels.join(", ") : "";

  return (
    <div ref={ref} className={`relative w-full text-start ${className}`}>
      {label && (
        <label className="text-xs font-semibold leading-3 text-dark mb-1.5">
          {label}
        </label>
      )}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`${defaultStyle} ${variantStyles[variant]} ${sizeStyles[selectSize]} flex items-center justify-between gap-2`}
      >
        <div className="flex items-center gap-2">
          {
            selectedLabels.length ?
              (
                selectedLabels.map((label, i) => {
                  return (
                    <PSm key={i} className="border rounded-full p-2.5 py-0.5 md:py-1.5 md:leading-3">{label}</PSm>
                  )
                })
              )
              :
              <span className={`truncate text-gray-400 `}>{placeholder}</span>
          }
        </div>
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          size={16}
          className={`shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <ul className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto rounded-lg border border-border-subtlest bg-white shadow-lg px-3">
          {options.map((option) => {
            const isSelected = value.includes(option.value);
            const isDisabled = !isSelected && !!maxSelect && value.length >= maxSelect;
            return (
              <li key={option.value} className="border-b border-dashed border-border-subtlest">
                <button
                  type="button"
                  onClick={() => toggleOption(option.value)}
                  disabled={isDisabled}
                  className={`flex items-center justify-between w-full px-3 py-2 text-sm font-body transition cursor-pointer ${isDisabled ? "text-gray-300 cursor-not-allowed" : "text-primary hover:bg-gray-50"}`}
                >
                  <span>{option.label}</span>
                  {isSelected ?
                    <div className={`rounded border bg-accent h-4.5 w-4.5`} >
                      <HugeiconsIcon
                        icon={Tick01Icon}
                        size={16}
                      />
                    </div>
                    :
                    <div className={`rounded border h-4.5 w-4.5 border-border-disabled`} />
                  }

                </button>
              </li>
            );
          })}
        </ul>
      )
      }

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div >
  );
}
