import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "dark" | "icon";
type ButtonSize = "default" | "sm" | "md" | "lg" | 'icon';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

const defaultStyle = "cursor-pointer inline-flex items-center justify-center gap-2 font-heading font-semibold transition  text-sm md:text-base"

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-primary hover:bg-[#a8ed20] btn-shadow",
  secondary:
    "bg-white text-primary hover:bg-gray-50 btn-shadow",
  outline:
    "bg-background text-primary border border-primary btn-outline-shadow",
  ghost:
    "bg-transparent text-primary hover:bg-gray-100",
  dark:
    "bg-dark text-white border border-dark hover:bg-[#2a2a2a] btn-shadow",
  icon:
    "bg-white"
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "h-10.5 px-3 md:px-5.5 rounded-lg md:rounded-[10px]",
  md: "px-3 py-3.25 rounded-[10px]",
  lg: "h-12 px-6 text-base rounded-xl",
  sm: "h-8 py-2.25 px-3 text-base rounded-full",
  icon: "h-8 w-8"
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
