"use client";

import { Tick01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { InputHTMLAttributes, forwardRef } from "react";

type CheckboxSize = "default" | "sm" | "lg";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> & {
  label?: string;
  checkboxSize?: CheckboxSize;
  onCheckedChange?: (checked: boolean) => void;
};

const boxSizes: Record<CheckboxSize, string> = {
  default: "size-4.5",
  sm: "size-3.5",
  lg: "size-5.5",
};

const iconSizes: Record<CheckboxSize, string> = {
  default: "size-3",
  sm: "size-2.5",
  lg: "size-3.5",
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      checkboxSize = "default",
      className = "",
      onCheckedChange,
      onChange,
      ...props
    },
    ref
  ) => {
    return (
      <label className={`inline-flex items-center gap-2 cursor-pointer ${className}`}>
        <div className="relative flex items-center justify-center">
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
          <div className={`${boxSizes[checkboxSize]} rounded border border-border-subtlest bg-white peer-checked:bg-accent peer-checked:border-primary transition`} />
          <HugeiconsIcon
            icon={Tick01Icon}
            size={18}
            className={`absolute inset-0 m-auto text-black opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none`}
          />
        </div>
        {label && (
          <span className="text-sm font-body text-primary">{label}</span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
