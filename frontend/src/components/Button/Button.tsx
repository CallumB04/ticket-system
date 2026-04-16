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
                "flex h-11 items-center justify-center gap-2 px-5 font-sans text-[13px] font-medium tracking-wide uppercase transition-all active:translate-y-px",
                variant === "primary" &&
                    (disabled
                        ? "bg-btn-primary-disabled text-btn-primary-disabled-text"
                        : "bg-btn-primary text-btn-primary-text hover:bg-btn-primary-hover border-btn-primary border"),
                variant === "secondary" &&
                    "border " +
                        (disabled
                            ? "bg-btn-secondary-disabled-bg text-btn-secondary-disabled-text border-btn-secondary-disabled-border"
                            : "text-btn-secondary-text hover:bg-btn-secondary-text hover:text-background border-btn-secondary-text bg-transparent"),
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
