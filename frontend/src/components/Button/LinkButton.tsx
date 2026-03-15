import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Button, { type ButtonVariant } from "./Button";

interface LinkButtonProps {
    className?: string;
    variant: ButtonVariant;
    to: string;
    children: ReactNode;
    disabled?: boolean;
    onClick?: () => void;
}

const LinkButton = ({
    className,
    variant,
    to,
    children,
    disabled,
    onClick,
}: LinkButtonProps) => {
    return (
        <Link to={to} className={twMerge("w-max cursor-pointer", className)}>
            <Button
                className={className}
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
