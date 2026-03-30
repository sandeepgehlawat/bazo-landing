type SpinnerSize = "sm" | "md" | "lg";

const sizeStyles: Record<SpinnerSize, string> = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-8 w-8 border-3",
};

export default function Spinner({ size = "md", className = "" }: { size?: SpinnerSize; className?: string }) {
    return (
        <div
            className={`animate-spin rounded-full border-solid border-current border-t-transparent ${sizeStyles[size]} ${className}`}
            role="status"
            aria-label="Loading"
        />
    );
}
