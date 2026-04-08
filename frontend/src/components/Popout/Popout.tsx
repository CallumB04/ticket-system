import type { ReactNode, Ref } from "react";
import { twMerge } from "tailwind-merge";

type PopoutXPosition = "left" | "right";
type PopoutYPosition = "top" | "bottom";

interface PopoutProps {
    className?: string;
    contentClassName?: string; // classes for content container when title is provided
    children: ReactNode;
    xPos: PopoutXPosition;
    yPos: PopoutYPosition;
    ref?: Ref<HTMLDivElement>;
    title?: string;
}

const Popout = ({
    className,
    contentClassName,
    children,
    xPos,
    yPos,
    ref,
    title,
}: PopoutProps) => {
    return (
        <div
            className={twMerge(
                "bg-surface border-layout-border absolute w-max rounded-md border p-1.5 shadow-lg",
                xPos === "left" && "right-0",
                xPos === "right" && "left-0",
                yPos === "top" && "bottom-full mb-1.5",
                yPos === "bottom" && "top-full mt-1.5",
                title && "p-0",
                className
            )}
            ref={ref}
        >
            {title && (
                <h2 className="border-b-layout-border text-text-primary w-full border-b px-4 py-3 text-sm font-medium">
                    {title}
                </h2>
            )}
            {title ? (
                <div className={twMerge("p-1.5", contentClassName)}>
                    {children}
                </div>
            ) : (
                children
            )}
        </div>
    );
};

export default Popout;
