import { useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Popout from "../../components/Popout/Popout";
import { ArchiveIcon, BellIcon, Building2Icon, SproutIcon } from "lucide-react";
import useClickOutside from "../../hooks/useClickOutside";
import { twMerge } from "tailwind-merge";
import {
    markNotificationAsRead,
    setNotificationAsArchived,
    type Notification,
    type NotificationType,
} from "../../api/notifications";
import ClickableGroup from "../../components/ClickableGroup/ClickableGroup";
import { getDaysAgoFromISO } from "../../util/date";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

interface NotificationsPopoutProps {
    className?: string;
    notifications: Notification[] | undefined;
    notificationsLoading: boolean;
    notificationsError: Error | null;
    closePopout: () => void;
}

const getIconFromNotificationType = (type: NotificationType) => {
    switch (type) {
        case "welcome":
            return <SproutIcon size={18} className="text-highlight/50" />;
        case "org-invite":
            return <Building2Icon size={18} className="text-red-300" />;
    }
};

const NotificationsPopout = ({
    className,
    notifications,
    notificationsLoading,
    notificationsError,
    closePopout,
}: NotificationsPopoutProps) => {
    const popoutRef = useRef<HTMLDivElement>(null);

    const [view, setView] = useState<string>("new");

    const handleClosePopout = () => {
        closePopout();
        handleMarkAllNotificationsAsRead();
    };

    useClickOutside(popoutRef, handleClosePopout); // close when click outside

    // Notify user when notifications fetch errors
    // TODO: Replace alert with Toast when Toaster is built
    useEffect(() => {
        if (notificationsError) {
            alert("Notifications error");
        }
    }, [notificationsError]);

    const handleMarkAllNotificationsAsRead = () => {
        notifications
            ?.filter((n) => !n.read)
            .forEach((n) =>
                (async () => {
                    await markNotificationAsRead(n.id);
                })()
            );
    };

    const filteredNotifications = useMemo(() => {
        switch (view) {
            case "new":
                return notifications?.filter((n) => !n.read);
            case "read":
                return notifications?.filter((n) => n.read && !n.archived);
            case "archived":
                return notifications?.filter((n) => n.archived);
            default:
                return notifications;
        }
    }, [notifications, view]);

    return (
        <Popout
            xPos="left"
            yPos="bottom"
            className={twMerge("flex h-80 w-88 flex-col", className)}
            contentClassName="p-0"
            ref={popoutRef}
            title="Notifications"
        >
            <span className="border-b-layout-border flex items-center gap-1.5 border-b p-2">
                <NotificationViewOptions
                    label="New"
                    active={view === "new"}
                    onClick={() => setView("new")}
                />
                <NotificationViewOptions
                    label="Read"
                    active={view === "read"}
                    onClick={() => setView("read")}
                />
                <NotificationViewOptions
                    label="Archived"
                    active={view === "archived"}
                    onClick={() => setView("archived")}
                    activeClassName="bg-danger/5 border-danger/20 text-danger/80"
                />
            </span>
            {notificationsLoading ? (
                // Loading Notifications
                <LoadingSpinner variant="surface" className="mx-auto mt-16" />
            ) : filteredNotifications && filteredNotifications?.length >= 1 ? (
                // Notifications
                <div className="flex w-full flex-col">
                    <div className="flex h-58 w-full flex-col overflow-y-scroll">
                        {filteredNotifications.map((n) => (
                            <NotificationPopoutItem notification={n} />
                        ))}
                    </div>
                </div>
            ) : (
                // No notifications
                <div className="text-text-placeholder mt-16 flex w-full flex-col items-center gap-2.5">
                    <BellIcon size={32} />
                    <p className="text-sm">No {view} notifications</p>
                </div>
            )}
        </Popout>
    );
};

// Component for individual notifications
const NotificationPopoutItem = ({
    notification,
}: {
    notification: Notification;
}) => {
    const queryClient = useQueryClient();

    const handleArchiveNotification = async () => {
        await setNotificationAsArchived(notification.id);
        await markNotificationAsRead(notification.id);
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
    };

    return (
        <div
            className={twMerge(
                "border-b-layout-border flex w-full items-start gap-3 rounded-none border-b p-2",
                !notification.read && "border-l-highlight/70 border-l-2"
            )}
        >
            {getIconFromNotificationType(notification.type)}
            <div className="flex-1 space-y-1">
                {!notification.read && (
                    <p className="bg-highlight/15 border-highlight/30 text-highlight w-max rounded border px-2 py-0.5 text-[11px] font-medium">
                        New
                    </p>
                )}
                <p className="text-text-primary text-[13px]">
                    {notification.description}
                </p>
                <p className="text-text-secondary text-xs">
                    {getDaysAgoFromISO(notification.created_at)}
                </p>
            </div>
            {!notification.archived && (
                <ClickableGroup
                    className="p-1.5"
                    title="Archive"
                    onClick={handleArchiveNotification}
                >
                    <ArchiveIcon size={14} className="text-text-secondary" />
                </ClickableGroup>
            )}
        </div>
    );
};

const NotificationViewOptions = ({
    activeClassName,
    label,
    active,
    onClick,
}: {
    activeClassName?: string;
    label: string;
    active: boolean;
    onClick: () => void;
}) => {
    return (
        <p
            className={twMerge(
                "rounded border px-2 py-1 text-xs font-medium transition-colors",
                active
                    ? twMerge(
                          "bg-highlight/5 border-highlight/20 text-highlight/80 select-none",
                          activeClassName
                      )
                    : "hover:bg-surface-muted/50 border-layout-border text-text-disabled cursor-pointer"
            )}
            onClick={onClick}
        >
            {label}
        </p>
    );
};

export default NotificationsPopout;
