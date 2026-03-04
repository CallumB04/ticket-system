import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface PageHeaderProps {
    className?: string;
    children: ReactNode;
}

const PageHeader = ({ className, children }: PageHeaderProps) => {
    return (
        <h1
            className={twMerge(
                "text-text-primary text-3xl font-semibold",
                className
            )}
        >
            {children}
        </h1>
    );
};

export default PageHeader;
