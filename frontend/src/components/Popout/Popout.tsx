import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type PopoutXPosition = "left" | "right";
type PopoutYPosition = "top" | "bottom";

interface PopoutProps {
    className?: string;
    children: ReactNode;
    xPos: PopoutXPosition;
    yPos: PopoutYPosition;
}

const Popout = ({ className, children, xPos, yPos }: PopoutProps) => {
    return (
        <div
            className={twMerge(
                "bg-surface border-layout-border absolute w-max rounded-md border p-1 shadow-lg",
                xPos === "left" && "right-full mr-1.5",
                xPos === "right" && "left-full ml-1.5",
                yPos === "top" && "bottom-0 mb-1.5",
                yPos === "bottom" && "top-0 mt-1.5",
                className
            )}
        >
            {children}
        </div>
    );
};

export default Popout;
