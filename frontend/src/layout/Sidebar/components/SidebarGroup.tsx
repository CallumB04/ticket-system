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
                <p className="text-text-disabled px-2.5 font-mono text-[11px] font-medium tracking-[0.04em] lowercase">
                    {title}
                </p>
            )}
            <div className={twMerge("flex w-full flex-col gap-0.5", className)}>
                {children}
            </div>
        </div>
    );
};

export default SidebarGroup;
