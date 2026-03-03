import { twMerge } from "tailwind-merge";

interface LoadingSpinnerProps {
    className?: string;
    variant: "bg" | "surface" | "btn-disabled"; // determines spinner and center colors
}

const LoadingSpinner = ({ className, variant }: LoadingSpinnerProps) => {
    return (
        <div
            className={twMerge(
                "to-highlight animate-spin rounded-full bg-conic from-transparent",
                variant === "btn-disabled"
                    ? "to-btn-primary-disabled-text size-5 p-px"
                    : "to-highlight size-8 p-0.5",
                className
            )}
        >
            <div
                className={twMerge(
                    "size-full rounded-full",
                    variant === "bg" && "bg-background",
                    variant === "surface" && "bg-surface",
                    variant === "btn-disabled" && "bg-btn-primary-disabled"
                )}
            ></div>
        </div>
    );
};

export default LoadingSpinner;
