import { twMerge } from "tailwind-merge";
import CardTitle from "./CardTitle";
import CardDescription from "./CardDescription";
import type { ReactNode } from "react";

type CardVariant = "default" | "muted" | "border";
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
                "border-surface-border flex w-max flex-col gap-4 border transition-all",
                getPaddingFromSize(size),
                variant === "default" && "bg-surface",
                variant === "muted" && "bg-surface-muted",
                variant === "border" && "bg-transparent",
                variant !== "border" &&
                    "shadow-[6px_6px_0px_var(--surface-border-color)]",
                onClick && "hover:border-surface-border-hover cursor-default",
                variant !== "border" &&
                    onClick &&
                    "hover:shadow-[4px_4px_0px_var(--highlight-color)]",
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
