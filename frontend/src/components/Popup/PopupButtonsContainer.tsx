import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface PopupButtonsContainerProps {
    className?: string;
    children: ReactNode;
}

const PopupButtonsContainer = ({
    className,
    children,
}: PopupButtonsContainerProps) => {
    return (
        <span
            className={twMerge(
                "flex w-full flex-col-reverse gap-x-2 gap-y-3 sm:flex-row",
                className
            )}
        >
            {children}
        </span>
    );
};

export default PopupButtonsContainer;
