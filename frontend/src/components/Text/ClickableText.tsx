import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ClickableTextProps {
    className?: string;
    children: ReactNode;
    onClick: () => void;
}

const ClickableText = ({
    className,
    children,
    onClick,
}: ClickableTextProps) => {
    return (
        <div
            className={twMerge(
                "text-highlight hover:text-highlight-hover w-max cursor-pointer font-medium hover:underline",
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default ClickableText;
