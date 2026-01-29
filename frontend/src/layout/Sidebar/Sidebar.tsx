import { twMerge } from "tailwind-merge";
import SidebarLink from "./components/SidebarLink";
import { useLocation } from "react-router-dom";
import { LayoutDashboard, Users } from "lucide-react";

interface SidebarProps {
    className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
    const location = useLocation();

    return (
        <aside
            className={twMerge(
                "bg-surface mt-navbar-height w-sidebar-width fixed top-0 left-0 hidden h-[calc(100vh-var(--navbar-height))] flex-col gap-2 px-3 py-4 lg:flex",
                className
            )}
        >
            <SidebarLink
                to="/dashboard"
                open={location.pathname.includes("dashboard")}
            >
                <LayoutDashboard />
                <p>Dashboard</p>
            </SidebarLink>
            <SidebarLink to="/teams" open={location.pathname.includes("teams")}>
                <Users />
                <p>Teams</p>
            </SidebarLink>
        </aside>
    );
};

export default Sidebar;
