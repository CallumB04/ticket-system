import { twMerge } from "tailwind-merge";
import CardTitle from "./CardTitle";
import CardDescription from "./CardDescription";
import type { ReactNode } from "react";

type CardVariant =
    | "default"
    | "muted"
    | "border"
    | "highlight"
    | "highlight-muted";
type CardSize = "default" | "medium" | "small";

interface CardProps {
    className?: string;
    children?: ReactNode;
    variant?: CardVariant;
    size?: CardSize;
    title?: string;
    description?: string;
    onClick?: () => void;
}

const getPaddingFromSize = (size: CardSize) => {
    switch (size) {
        case "default":
            return "p-4";
        case "medium":
            return "p-3";
        case "small":
            return "p-2";
    }
};

const Card = ({
    className,
    children,
    variant = "default",
    size = "default",
    title,
    description,
    onClick,
}: CardProps) => {
    return (
        <div
            className={twMerge(
                "border-surface-border flex w-max flex-col gap-4 rounded border shadow transition-colors",
                getPaddingFromSize(size),
                variant === "default" && "bg-surface",
                variant === "muted" && "bg-surface-muted",
                variant === "border" && "bg-transparent shadow-none",
                variant === "highlight" &&
                    "bg-highlight/15 border-highlight/50",
                variant === "highlight-muted" &&
                    "bg-highlight/5 border-highlight/20 shadow-none",
                onClick && "hover:border-surface-border-hover cursor-default",
                onClick &&
                    variant === "highlight" &&
                    "hover:border-highlight/90",
                className
            )}
            onClick={onClick}
        >
            {/* Card Header */}
            {(title || description) && (
                <div className="space-y-0.5">
                    {title && <CardTitle>{title}</CardTitle>}
                    {description && (
                        <CardDescription>{description}</CardDescription>
                    )}
                </div>
            )}
            {children}
        </div>
    );
};

export default Card;
