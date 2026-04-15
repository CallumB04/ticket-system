import { twMerge } from "tailwind-merge";
import CardTitle from "./CardTitle";
import CardDescription from "./CardDescription";
import type { ReactNode } from "react";

type CardVariant = "default" | "muted" | "border";
type CardSize = "default" | "sm" | "xs";

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
        case "sm":
            return "p-3";
        case "xs":
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
                onClick &&
                    "hover:border-surface-border-hover transform cursor-pointer hover:-translate-y-1",
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
