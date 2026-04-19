import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface CardTitleProps {
    className?: string;
    children: ReactNode;
}

const CardTitle = ({ className, children }: CardTitleProps) => {
    return (
        <h2
            className={twMerge(
                "text-text-primary text-[17px] font-medium tracking-[-0.01em] lowercase",
                className
            )}
        >
            {children}
        </h2>
    );
};

export default CardTitle;
