import { twMerge } from "tailwind-merge";
import SidebarLink from "./components/SidebarLink";
import { useLocation } from "react-router-dom";
import {
    BotIcon,
    BrainIcon,
    ChartColumnIcon,
    ChartLineIcon,
    CogIcon,
    GaugeCircleIcon,
    InboxIcon,
    ListTodoIcon,
    SettingsIcon,
    TicketIcon,
    UsersIcon,
    WorkflowIcon,
} from "lucide-react";
import { useSidebar } from "../../contexts/SidebarContext";
import { useEffect } from "react";
import SidebarGroup from "./components/SidebarGroup";
import { fetchOrganisations } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../contexts/UserContext";
import { useOrganisation } from "../../contexts/OrganisationContext";
import Dropdown from "../../components/Dropdown/Dropdown";

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

    const { user } = useUser();
    const { activeOrganisation, setActiveOrganisation } = useOrganisation();

    // Load organisations on component mount
    const { data: organisations } = useQuery({
        queryKey: ["organisations", user?.id], // refetch when user changes
        queryFn: async () => {
            const orgs = await fetchOrganisations();
            return orgs ?? [];
        },
    });

    // Update activeOrganisation when organisations changes
    useEffect(() => {
        if (
            !activeOrganisation ||
            !organisations?.includes(activeOrganisation)
        ) {
            if (organisations && organisations.length > 0) {
                setActiveOrganisation(organisations[0]);
            } else {
                setActiveOrganisation(undefined);
            }
        }
    }, [organisations]);

    return (
        <aside
            className={twMerge(
                "bg-surface border-r-layout-border mt-navbar-height w-sidebar-width fixed top-0 left-0 z-99 h-[calc(100vh-var(--navbar-height))] flex-col gap-6 border-r px-3 py-4 lg:flex",
                isMobileSidebarOpen ? "flex" : "hidden",
                className
            )}
        >
            {/* Organisations Dropdown */}
            {organisations && organisations?.length >= 2 && (
                <SidebarGroup title="Select Organisation">
                    <Dropdown
                        options={organisations?.map((o) => {
                            return { value: o.id, label: o.name };
                        })}
                        className="h-10! w-full"
                        value={activeOrganisation?.id}
                        onChange={(val) =>
                            setActiveOrganisation(
                                organisations.find((o) => o.id === val)
                            )
                        }
                    />
                </SidebarGroup>
            )}
            <SidebarGroup title="Workspace">
                <SidebarLink
                    text="Dashboard"
                    icon={<GaugeCircleIcon size={18} />}
                    to="/dashboard"
                    open={location.pathname.includes("dashboard")}
                />
                <SidebarLink
                    text="Inbox"
                    icon={<InboxIcon size={18} />}
                    to="/inbox"
                    open={location.pathname.includes("inbox")}
                />
                <SidebarLink
                    text="My Tasks"
                    icon={<ListTodoIcon size={18} />}
                    to="/my-tasks"
                    open={location.pathname.includes("my-tasks")}
                />
                <SidebarLink
                    text="All Tickets"
                    icon={<TicketIcon size={18} />}
                    to="/tickets"
                    open={location.pathname.includes("tickets")}
                />
            </SidebarGroup>

            <SidebarGroup title="Create">
                <SidebarLink
                    text="New Request"
                    icon={<BotIcon size={18} />}
                    to="/request"
                    open={location.pathname.includes("request")}
                />
                <SidebarLink
                    text="Knowledge Base"
                    icon={<BrainIcon size={18} />}
                    to="/knowledge-base"
                    open={location.pathname.includes("knowledge-base")}
                />
            </SidebarGroup>

            <SidebarGroup title="Organisation">
                <SidebarLink
                    text="Teams"
                    icon={<UsersIcon size={18} />}
                    to="/teams"
                    open={location.pathname.includes("teams")}
                />
                <SidebarLink
                    text="Activity"
                    icon={<ChartLineIcon size={18} />}
                    to="/activity"
                    open={location.pathname.includes("activity")}
                />
                <SidebarLink
                    text="Settings"
                    icon={<SettingsIcon size={18} />}
                    to="/settings"
                    open={location.pathname.includes("settings")}
                />
            </SidebarGroup>
        </aside>
    );
};

export default Sidebar;
