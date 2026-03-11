import { twMerge } from "tailwind-merge";
import CardTitle from "./CardTitle";
import CardDescription from "./CardDescription";
import type { ReactNode } from "react";

type CardVariant = "default" | "muted" | "border" | "hero";
type CardSize = "default" | "small";

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
                "border-surface-border w-max space-y-4 rounded border shadow transition-colors",
                getPaddingFromSize(size),
                variant === "default" && "bg-surface",
                variant === "muted" && "bg-surface-muted",
                variant === "border" && "bg-transparent shadow-none",
                variant === "hero" && "bg-highlight/15 border-highlight/50",
                onClick && "hover:border-surface-border-hover cursor-default",
                onClick && variant === "hero" && "hover:border-highlight/90",
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
