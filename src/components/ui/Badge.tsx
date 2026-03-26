import { HTMLAttributes, ReactNode } from "react";

type BadgeVariant = "default" | "accent" | "light" | "glow";
type BadgeSize = "sm" | "default";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
};

const defaultStyle = "w-fit flex items-center justify-center rounded-full";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-dark text-white border border-dark badge-shadow mx-auto",
  accent: "bg-accent text-primary font-heading font-semibold",
  light: "bg-white text-primary border border-gray-100 shadow-sm font-heading font-medium",
  glow: "border border-dark text-white",
};

const sizeStyles: Record<BadgeSize, string> = {
  default: "px-2.25 py-2 text-sm leading-3",
  sm: "px-4 py-1.5 text-xs",
};

const glowStyle = {
  background: "linear-gradient(180deg, #0C0C0C 11.41%, #4B4B4A 100%)",
  boxShadow:
    "0 -1px 7px -4px rgba(181, 254, 40, 0.86) inset, 0 4px 9px -3px #292825, 0 13px 19px -12px rgba(181, 254, 40, 0.50)",
};

export default function Badge({
  variant = "default",
  size = "default",
  children,
  className = "",
  style,
  ...props
}: BadgeProps) {
  return (
    <div
      className={`${defaultStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      style={variant === "glow" ? { ...glowStyle, ...style } : style}
      {...props}
    >
      {children}
    </div>
  );
}
