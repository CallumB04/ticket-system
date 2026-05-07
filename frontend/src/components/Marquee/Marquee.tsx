import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface MarqueeProps {
    className?: string;
    children: ReactNode;
    durationSeconds?: number;
}

const Marquee = ({
    className,
    children,
    durationSeconds = 32,
}: MarqueeProps) => {
    return (
        <div className={twMerge("w-full overflow-hidden", className)}>
            <div
                className="animate-home-marquee inline-flex w-max items-center whitespace-nowrap"
                style={{ animationDuration: `${durationSeconds}s` }}
            >
                <div className="flex shrink-0 items-center">{children}</div>
                <div className="flex shrink-0 items-center" aria-hidden="true">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Marquee;
