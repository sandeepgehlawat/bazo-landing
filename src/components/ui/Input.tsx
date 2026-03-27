import { InputHTMLAttributes, forwardRef } from "react";

type InputVariant = "default" | "outline" | "ghost";
type InputSize = "default" | "sm" | "md" | "lg";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  variant?: InputVariant;
  inputSize?: InputSize;
  label?: string;
  error?: string;
};

const defaultStyle =
  "w-full font-body font-normal transition outline-none";

const variantStyles: Record<InputVariant, string> = {
  default: "text-primary",
  outline: "bg-transparent text-primary border border-border-disabled input-shadow",
  ghost: "bg-transparent text-primary border-b border-[#D9DBD5] focus:border-accent rounded-none",
};

const sizeStyles: Record<InputSize, string> = {
  default: "rounded-lg md:rounded-[10px]",
  sm: "px-2.5 py-2 text-sm rounded-lg",
  md: "h-10 px-4 text-sm rounded-[10px]",
  lg: "h-12 px-5 text-base rounded-xl",
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "default",
      inputSize = "default",
      label,
      error,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full text-start">
        {label && (
          <label className="text-xs font-semibold leading-3 text-dark mb-1.5">{label}</label>
        )}
        <input
          ref={ref}
          className={`${defaultStyle} ${variantStyles[variant]} ${sizeStyles[inputSize]} ${error ? "border-red-500 focus:border-red-500" : ""} ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
