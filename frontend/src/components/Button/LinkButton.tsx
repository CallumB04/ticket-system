import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Button, { type ButtonVariant } from "./Button";

interface LinkButtonProps {
    className?: string;
    linkClassName?: string;
    buttonClassName?: string;
    variant: ButtonVariant;
    to: string;
    children: ReactNode;
    disabled?: boolean;
    onClick?: () => void;
}

const LinkButton = ({
    className,
    linkClassName,
    buttonClassName,
    variant,
    to,
    children,
    disabled,
    onClick,
}: LinkButtonProps) => {
    return (
        <Link
            to={to}
            className={twMerge(
                "w-max cursor-pointer",
                className,
                linkClassName
            )}
        >
            <Button
                className={twMerge(className, buttonClassName)}
                variant={variant}
                disabled={disabled}
                onClick={onClick}
            >
                {children}
            </Button>
        </Link>
    );
};

export default LinkButton;
