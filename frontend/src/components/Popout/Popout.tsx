import type { ReactNode, Ref } from "react";
import { twMerge } from "tailwind-merge";

type PopoutXPosition = "left" | "right";
type PopoutYPosition = "top" | "bottom";

interface PopoutProps {
    className?: string;
    children: ReactNode;
    xPos: PopoutXPosition;
    yPos: PopoutYPosition;
    ref?: Ref<HTMLDivElement>;
}

const Popout = ({ className, children, xPos, yPos, ref }: PopoutProps) => {
    return (
        <div
            className={twMerge(
                "bg-surface border-layout-border absolute w-max rounded-md border p-1.5 shadow-lg",
                xPos === "left" && "right-0",
                xPos === "right" && "left-0",
                yPos === "top" && "bottom-full mb-1.5",
                yPos === "bottom" && "top-full mt-1.5",
                className
            )}
            ref={ref}
        >
            {children}
        </div>
    );
};

export default Popout;
