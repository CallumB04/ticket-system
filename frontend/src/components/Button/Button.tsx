import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
    className?: string;
    variant: "primary" | "secondary" | "danger";
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
                "flex h-12 items-center justify-center gap-2 rounded px-4 font-medium transition-colors duration-150",
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
                !disabled && "cursor-pointer",
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
