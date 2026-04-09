import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ClickableGroupProps {
    className?: string;
    children: ReactNode;
    title?: string;
    onClick?: () => void;
}

const ClickableGroup = ({
    className,
    children,
    title,
    onClick,
}: ClickableGroupProps) => {
    return (
        <div
            className={twMerge(
                "hover:bg-btn-secondary-hover-bg text-text-primary flex w-max cursor-pointer items-center gap-2 rounded-sm p-2 transition-colors",
                className
            )}
            onClick={onClick}
            title={title}
        >
            {children}
        </div>
    );
};

export default ClickableGroup;
