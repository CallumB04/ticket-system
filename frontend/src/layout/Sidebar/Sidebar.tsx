import { twMerge } from "tailwind-merge";
import SidebarLink from "./components/SidebarLink";
import { useLocation } from "react-router-dom";
import { GaugeCircleIcon, HomeIcon, UsersIcon } from "lucide-react";
import { useSidebar } from "../../contexts/SidebarContext";
import Divider from "../../components/Divider/Divider";
import { useEffect } from "react";

interface SidebarProps {
    className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
    const location = useLocation();
    const { isMobileSidebarOpen, closeMobileSidebar } = useSidebar();

    // close mobile sidebar if location changes
    useEffect(() => {
        closeMobileSidebar();
    }, [location.pathname]);

    return (
        <aside
            className={twMerge(
                "bg-surface border-r-layout-border mt-navbar-height w-sidebar-width fixed top-0 left-0 h-[calc(100vh-var(--navbar-height))] flex-col gap-1.5 border-r px-3 py-4 lg:flex",
                isMobileSidebarOpen ? "flex" : "hidden",
                className
            )}
        >
            {/* Return to Home button - Only visible on mobile sidebar */}
            <div className="flex flex-col gap-1.5 lg:hidden">
                <SidebarLink
                    text="Return to Home"
                    icon={<HomeIcon size={20} />}
                    to="/"
                />
                <Divider />
            </div>
            <SidebarLink
                text="Dashboard"
                icon={<GaugeCircleIcon size={20} />}
                to="/dashboard"
                open={location.pathname.includes("dashboard")}
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
