import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Button from "./Button";

interface LinkButtonProps {
    className?: string;
    variant: "primary" | "secondary" | "danger";
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
