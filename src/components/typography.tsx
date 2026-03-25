import { ReactNode } from "react";

type TypographyProps = {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

// -----------------------------------------------------------
// Headings — Hanken Grotesk
// -----------------------------------------------------------
export function H1({ children, className = "", style }: TypographyProps) {
  return (
    <h1 className={`font-heading font-black text-[46px] leading-13.5 md:text-[72px] md:leading-19.5 ${className}`} style={style}>
      {children}
    </h1>
  );
}

export function H2({ children, className = "", style }: TypographyProps) {
  return (
    <h2 className={`font-heading font-black text-[42px] leading-12 md:text-[60px] md:leading-16.5 ${className}`} style={style}>
      {children}
    </h2>
  );
}

export function H3({ children, className = "", style }: TypographyProps) {
  return (
    <h3 className={`font-heading font-black text-[34px] leading-10 md:text-[52px] md:leading-15.5 ${className}`} style={style}>
      {children}
    </h3>
  );
}

export function H4({ children, className = "", style }: TypographyProps) {
  return (
    <h4 className={`font-heading font-black text-[28px] leading-8.5 md:text-[40px] md:leading-12 ${className}`} style={style}>
      {children}
    </h4>
  );
}

export function H5({ children, className = "", style }: TypographyProps) {
  return (
    <h5 className={`font-heading font-black text-[24px] leading-7 md:text-[32px] md:leading-9.5 ${className}`} style={style}>
      {children}
    </h5>
  );
}

export function H6({ children, className = "", style }: TypographyProps) {
  return (
    <h6 className={`font-heading font-bold text-[20px] leading-5.5 md:text-[24px] md:leading-7 ${className}`} style={style}>
      {children}
    </h6>
  );
}

// -----------------------------------------------------------
//Subheadings
// -----------------------------------------------------------

export function Sh0({ children, className = "", style }: TypographyProps) {
  return (
    <h6 className={`font-heading font-black text-[20px] leading-5.5 md:text-[22px] md:leading-6.5 ${className}`} style={style}>
      {children}
    </h6>
  );
}
export function Sh1({ children, className = "", style }: TypographyProps) {
  return (
    <h6 className={`font-heading font-bold text-[18px] leading-5 md:text-[20px] md:leading-6 ${className}`} style={style}>
      {children}
    </h6>
  );
}
export function Sh2({ children, className = "", style }: TypographyProps) {
  return (
    <h6 className={`font-heading font-bold text-[16px] leading-4.5 md:text-[18px] md:leading-5.5 ${className}`} style={style}>
      {children}
    </h6>
  );
}

// -----------------------------------------------------------
// Body — Roboto
// -----------------------------------------------------------
export function P({ children, className = "", style }: TypographyProps) {
  return (
    <p className={`font-body text-base leading-5.5 ${className}`} style={style}>
      {children}
    </p>
  );
}

export function PSm({ children, className = "", style }: TypographyProps) {
  return (
    <p className={`font-body text-sm leading-5 ${className}`} style={style}>
      {children}
    </p>
  );
}

export function PXs({ children, className = "", style }: TypographyProps) {
  return (
    <p className={`font-body text-xs leading-4 ${className}`} style={style}>
      {children}
    </p>
  );
}

// -----------------------------------------------------------
// Captions — Roboto
// -----------------------------------------------------------

export function LinkText({ children, className = "", style }: TypographyProps) {
  return (
    <span className={`font-body font-semibold text-[16px] leading-4.5 ${className}`} style={style}>
      {children}
    </span>
  );
}
export function ButtonText({ children, className = "", style }: TypographyProps) {
  return (
    <span className={`font-body text-[18px] leading-4.5 ${className}`} style={style}>
      {children}
    </span>
  );
}

export function Caption({ children, className = "", style }: TypographyProps) {
  return (
    <span className={`font-body text-base leading-4 ${className}`} style={style}>
      {children}
    </span>
  );
}
export function CaptionSm({ children, className = "", style }: TypographyProps) {
  return (
    <span className={`font-body text-sm leading-3.5 ${className}`} style={style}>
      {children}
    </span>
  );
}
export function CaptionXs({ children, className = "", style }: TypographyProps) {
  return (
    <span className={`font-body text-xs leading-3 ${className}`} style={style}>
      {children}
    </span>
  );
}