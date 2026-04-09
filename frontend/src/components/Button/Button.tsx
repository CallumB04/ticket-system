import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export type ButtonVariant =
    | "primary"
    | "secondary"
    | "danger"
    | "secondary-transparent"
    | "danger-transparent";

interface ButtonProps {
    className?: string;
    variant: ButtonVariant;
    children: ReactNode;
    disabled?: boolean;
    onClick?: () => void;
}

const Button = ({
    className,
    variant,
    children,
    disabled,
    onClick,
}: ButtonProps) => {
    return (
        <button
            className={twMerge(
                "flex h-12 items-center justify-center gap-2 rounded-sm px-4 text-sm font-medium tracking-wide transition-colors",
                variant === "primary" &&
                    (disabled
                        ? "bg-btn-primary-disabled text-btn-primary-disabled-text"
                        : "bg-btn-primary text-btn-primary-text hover:bg-btn-primary-hover"),
                variant === "secondary" &&
                    "border-2 " +
                        (disabled
                            ? "bg-btn-secondary-disabled-bg text-btn-secondary-disabled-text border-btn-secondary-disabled-border"
                            : "bg-btn-secondary-bg text-btn-secondary-text hover:bg-btn-secondary-hover-bg border-btn-secondary-border hover:border-btn-secondary-hover-border"),
                variant === "danger" &&
                    (disabled
                        ? "bg-btn-danger-disabled text-btn-danger-disabled-text"
                        : "bg-btn-danger text-btn-danger-text hover:bg-btn-danger-hover"),
                disabled ? "cursor-not-allowed" : "cursor-pointer",
                variant === "secondary-transparent" &&
                    "text-text-secondary hover:text-text-primary hover:bg-btn-secondary-hover-bg",
                variant === "danger-transparent" &&
                    "text-danger/70 hover:bg-btn-danger-hover/10",
                className
            )}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
