import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface PageDescriptionProps {
    className?: string;
    children: ReactNode;
}

const PageDescription = ({ className, children }: PageDescriptionProps) => {
    return (
        <p
            className={twMerge(
                "text-text-secondary text-[17px] leading-relaxed lowercase",
                className
            )}
        >
            {children}
        </p>
    );
};

export default PageDescription;
