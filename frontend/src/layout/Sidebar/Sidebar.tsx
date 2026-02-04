import { twMerge } from "tailwind-merge";
import SidebarLink from "./components/SidebarLink";
import { useLocation } from "react-router-dom";
import { Building2Icon, LayoutDashboardIcon, UsersIcon } from "lucide-react";

interface SidebarProps {
    className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
    const location = useLocation();

    return (
        <aside
            className={twMerge(
                "bg-surface border-r-layout-border mt-navbar-height w-sidebar-width fixed top-0 left-0 hidden h-[calc(100vh-var(--navbar-height))] flex-col gap-1.5 border-r px-3 py-4 lg:flex",
                className
            )}
        >
            <SidebarLink
                text="Dashboard"
                icon={<LayoutDashboardIcon size={20} />}
                to="/dashboard"
                open={location.pathname.includes("dashboard")}
            />
            <SidebarLink
                text="Organisations"
                icon={<Building2Icon size={20} />}
                to="/organisations"
                open={location.pathname.includes("organisations")}
            />
            <SidebarLink
                text="Teams"
                icon={<UsersIcon size={20} />}
                to="/teams"
                open={location.pathname.includes("teams")}
            />
        </aside>
    );
};

export default Sidebar;
