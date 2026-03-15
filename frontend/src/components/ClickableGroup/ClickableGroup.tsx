import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ClickableGroupProps {
    className?: string;
    children: ReactNode;
    onClick?: () => void;
}

const ClickableGroup = ({
    className,
    children,
    onClick,
}: ClickableGroupProps) => {
    return (
        <div
            className={twMerge(
                "hover:bg-btn-secondary-hover-bg flex w-max cursor-pointer items-center gap-2 rounded-md p-1.5 transition-colors",
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default ClickableGroup;
