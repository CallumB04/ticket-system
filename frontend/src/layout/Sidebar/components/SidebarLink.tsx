import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface SidebarLinkProps {
    className?: string;
    text: string;
    icon: ReactNode;
    to: string;
    open?: boolean; // is this the current open page?
}

const SidebarLink = ({ className, text, icon, to, open }: SidebarLinkProps) => {
    return (
        <Link
            to={to}
            className={twMerge(
                "group flex w-full items-center gap-2.5 rounded-md px-2.5 py-[7px] transition-colors",
                open
                    ? "bg-highlight/10"
                    : "hover:bg-surface-muted",
                className
            )}
        >
            <span
                className={twMerge(
                    "transition-colors",
                    open
                        ? "text-highlight"
                        : "text-text-secondary group-hover:text-text-primary"
                )}
            >
                {icon}
            </span>
            <p
                className={twMerge(
                    "text-[13px] font-medium lowercase",
                    open
                        ? "text-highlight"
                        : "text-text-primary/80 group-hover:text-text-primary transition-colors"
                )}
            >
                {text}
            </p>
        </Link>
    );
};

export default SidebarLink;
