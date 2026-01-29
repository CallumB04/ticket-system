import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

interface SidebarLinkProps {
    className?: string;
    children: ReactNode;
    to: string;
    open?: boolean; // is this the current open page?
}

const SidebarLink = ({ className, children, to, open }: SidebarLinkProps) => {
    return (
        <Link
            to={to}
            className={twMerge(
                "flex h-max w-full items-center gap-4 rounded p-3 transition-colors duration-200",
                open
                    ? "bg-highlight text-btn-primary-text"
                    : "hover:bg-surface-muted text-text-primary",
                className
            )}
        >
            {children}
        </Link>
    );
};

export default SidebarLink;
