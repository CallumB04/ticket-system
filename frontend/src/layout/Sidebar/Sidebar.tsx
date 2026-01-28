import { twMerge } from "tailwind-merge";

interface SidebarProps {
    className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
    return (
        <aside
            className={twMerge(
                "bg-surface mt-navbar-height w-sidebar-width fixed top-0 left-0 hidden h-[calc(100vh-var(--navbar-height))] px-3 py-4 lg:flex",
                className
            )}
        >
            Sidebar
        </aside>
    );
};

export default Sidebar;
