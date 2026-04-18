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
                "bg-surface border-surface-border absolute z-90 w-max rounded-lg border p-1.5 shadow-xl",
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
                <p className="border-b-layout-border text-text-disabled w-full border-b px-3.5 py-2.5 font-mono text-[11px] font-medium tracking-[0.08em] uppercase">
                    {title}
                </p>
            )}
            {title ? (
                <div
                    className={twMerge(
                        "flex min-h-0 flex-1 flex-col p-1.5",
                        contentClassName
                    )}
                >
                    {children}
                </div>
            ) : (
                children
            )}
        </div>
    );
};

export default Popout;
