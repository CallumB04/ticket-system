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
                "group flex h-max w-full items-center gap-3 rounded-md px-2.5 py-2 transition-colors",
                open ? "bg-highlight/10" : "hover:bg-surface-muted/70",
                className
            )}
        >
            <span className={open ? "text-highlight/80" : "text-text-primary"}>
                {icon}
            </span>
            <p
                className={twMerge(
                    "text-sm font-medium tracking-wide",
                    open
                        ? "text-highlight/80"
                        : "text-text-secondary group-hover:text-text-primary transition-colors"
                )}
            >
                {text}
            </p>
        </Link>
    );
};

export default SidebarLink;
