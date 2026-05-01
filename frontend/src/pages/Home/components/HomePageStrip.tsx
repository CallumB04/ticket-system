import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface HomePageStripProps {
    className?: string;
    icon: ReactNode;
    title: string;
    description: string;
}

const HomePageStrip = ({
    className,
    icon,
    title,
    description,
}: HomePageStripProps) => {
    return (
        <div
            className={twMerge("flex max-w-96 justify-center gap-4", className)}
        >
            {icon}
            <div className="flex flex-col gap-1">
                <h3 className="text-text-primary text-lg font-medium">
                    {title}
                </h3>
                <p className="text-text-secondary text-balance">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default HomePageStrip;
