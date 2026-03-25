import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "dark";
type ButtonSize = "default" | "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

const defaultStyle = "cursor-pointer inline-flex items-center justify-center gap-2 font-heading font-semibold transition btn-shadow text-sm md:text-base"

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-primary hover:bg-[#a8ed20]",
  secondary:
    "bg-white text-primary hover:bg-gray-50",
  outline:
    "bg-transparent text-primary border-2 border-primary hover:bg-gray-100",
  ghost:
    "bg-transparent text-primary hover:bg-gray-100",
  dark:
    "bg-dark text-white border border-dark hover:bg-[#2a2a2a] btn-shadow",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "h-11 px-3 md:px-5.5 rounded-lg md:rounded-[10px]",
  sm: "h-8 px-3 text-xs rounded-lg",
  md: "h-10 px-5 text-sm rounded-[10px]",
  lg: "h-12 px-6 text-base rounded-xl",
};

export default function Button({
  variant = "primary",
  size = "default",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${defaultStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
