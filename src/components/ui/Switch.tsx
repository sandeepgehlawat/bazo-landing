"use client";

import { InputHTMLAttributes, forwardRef } from "react";

type SwitchSize = "default" | "sm" | "lg";

type SwitchProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> & {
  label?: string;
  switchSize?: SwitchSize;
  onCheckedChange?: (checked: boolean) => void;
};

const trackSizes: Record<SwitchSize, string> = {
  default: "w-10 h-5.5",
  sm: "w-8 h-4.5",
  lg: "w-12 h-7",
};

const thumbSizes: Record<SwitchSize, string> = {
  default: "size-4 peer-checked:translate-x-4.5",
  sm: "size-3.5 peer-checked:translate-x-3.5",
  lg: "size-5.5 peer-checked:translate-x-5",
};

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      switchSize = "default",
      className = "",
      onCheckedChange,
      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <label className={`inline-flex items-center gap-2 cursor-pointer ${className}`}>
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            className="peer sr-only"
            onChange={(e) => {
              onChange?.(e);
              onCheckedChange?.(e.target.checked);
            }}
            {...props}
          />
          <div
            className={`${trackSizes[switchSize]} rounded-full bg-[#D9DBD5] peer-checked:bg-accent transition`}
          />
          <div
            className={`${thumbSizes[switchSize]} absolute top-1/2 left-0.5 -translate-y-1/2 rounded-full bg-white shadow transition-transform peer-checked:translate-x-full ${thumbSizes[switchSize]}`}
          />
        </div>
        {label && (
          <span className="text-sm font-body text-primary">{label}</span>
        )}
      </label>
    );
  }
);

Switch.displayName = "Switch";

export default Switch;
