import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface PopupDescriptionProps {
    className?: string;
    children: ReactNode;
}

const PopupDescription = ({ className, children }: PopupDescriptionProps) => {
    return (
        <p
            className={twMerge(
                "text-text-secondary text-[15px] leading-relaxed",
                className
            )}
        >
            {children}
        </p>
    );
};

export default PopupDescription;
