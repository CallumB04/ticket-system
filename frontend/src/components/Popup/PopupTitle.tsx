import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface PopupTitleProps {
    className?: string;
    children: ReactNode;
}

const PopupTitle = ({ className, children }: PopupTitleProps) => {
    return (
        <h2 className={twMerge("text-text-primary font-medium", className)}>
            {children}
        </h2>
    );
};

export default PopupTitle;
