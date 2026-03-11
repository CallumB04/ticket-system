import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CardDescriptionProps {
    className?: string;
    children: ReactNode;
}

const CardDescription = ({ className, children }: CardDescriptionProps) => {
    return (
        <p className={twMerge("text-text-secondary text-sm", className)}>
            {children}
        </p>
    );
};

export default CardDescription;
