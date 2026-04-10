import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface SidebarGroupProps {
    className?: string;
    title?: string;
    children: ReactNode;
}

const SidebarGroup = ({ className, title, children }: SidebarGroupProps) => {
    return (
        <div className={twMerge("flex w-full flex-col gap-2", className)}>
            {title && (
                <p className="text-text-secondary font-mono text-xs">
                    -- {title} --
                </p>
            )}
            <div className={twMerge("flex w-full flex-col gap-1", className)}>
                {children}
            </div>
        </div>
    );
};

export default SidebarGroup;
