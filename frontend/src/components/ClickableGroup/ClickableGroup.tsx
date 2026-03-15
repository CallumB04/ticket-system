import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ClickableGroupProps {
    className?: string;
    children: ReactNode;
    isIcon?: boolean;
    onClick?: () => void;
}

const ClickableGroup = ({
    className,
    children,
    isIcon,
    onClick,
}: ClickableGroupProps) => {
    return (
        <div
            className={twMerge(
                "hover:bg-btn-secondary-hover-bg text-text-primary flex w-max cursor-pointer items-center gap-2 p-2 transition-colors",
                isIcon ? "rounded-xl" : "rounded-md",
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default ClickableGroup;
