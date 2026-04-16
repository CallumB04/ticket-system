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
            return (
                <div className="bg-highlight/10 flex size-8 shrink-0 items-center justify-center rounded-full">
                    <SproutIcon size={15} className="text-highlight" />
                </div>
            );
        case "org-invite":
            return (
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-red-500/10">
                    <Building2Icon size={15} className="text-red-400" />
                </div>
            );
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
            className={twMerge("flex h-96 w-92 flex-col", className)}
            contentClassName="p-0"
            ref={popoutRef}
            title="Notifications"
        >
            {/* View tabs */}
            <div className="border-b-layout-border flex items-center gap-1 border-b px-3 py-2">
                <NotificationViewOption
                    label="New"
                    active={view === "new"}
                    onClick={() => setView("new")}
                />
                <NotificationViewOption
                    label="Read"
                    active={view === "read"}
                    onClick={() => setView("read")}
                />
                <NotificationViewOption
                    label="Archived"
                    active={view === "archived"}
                    onClick={() => setView("archived")}
                    activeClassName="bg-danger/8 text-danger"
                />
            </div>
            {/* Content */}
            {notificationsLoading ? (
                <div className="flex flex-1 items-center justify-center">
                    <LoadingSpinner variant="surface" />
                </div>
            ) : filteredNotifications && filteredNotifications?.length >= 1 ? (
                <div className="flex-1 overflow-y-auto">
                    {filteredNotifications.map((n) => (
                        <NotificationPopoutItem
                            notification={n}
                            key={n.id}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-text-disabled flex flex-1 flex-col items-center justify-center gap-2 pb-10">
                    <BellIcon size={28} strokeWidth={1.5} />
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
        // Mark notification as archived and read
        await setNotificationAsArchived(notification.id);
        await markNotificationAsRead(notification.id);

        // Refetch notifications from Supabase
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
    };

    return (
        <div
            className={twMerge(
                "border-b-layout-border group flex w-full items-start gap-3 border-b px-3.5 py-3 transition-colors hover:bg-surface-muted/50",
                !notification.read && "bg-highlight/[0.03]"
            )}
        >
            {getIconFromNotificationType(notification.type)}
            <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex items-center gap-2">
                    {!notification.read && (
                        <span className="bg-highlight size-1.5 shrink-0 rounded-full" />
                    )}
                    {notification.archived && (
                        <span className="text-text-disabled font-mono text-[10px] font-medium uppercase tracking-wider">
                            Archived
                        </span>
                    )}
                    <span className="text-text-disabled font-mono text-[11px]">
                        {getDaysAgoFromISO(notification.created_at)}
                    </span>
                </div>
                <p className="text-text-primary text-[13px] leading-snug">
                    {notification.description}
                </p>
            </div>
            {!notification.archived && (
                <button
                    className="text-text-disabled hover:text-text-primary hover:bg-surface-muted shrink-0 cursor-pointer rounded-md p-1.5 opacity-0 transition-all group-hover:opacity-100"
                    title="Archive"
                    onClick={handleArchiveNotification}
                >
                    <ArchiveIcon size={14} />
                </button>
            )}
        </div>
    );
};

const NotificationViewOption = ({
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
        <button
            className={twMerge(
                "rounded-md px-2.5 py-1 font-mono text-[11px] font-medium tracking-wide transition-colors",
                active
                    ? twMerge(
                          "bg-highlight/10 text-highlight select-none",
                          activeClassName
                      )
                    : "text-text-disabled hover:text-text-secondary hover:bg-surface-muted cursor-pointer"
            )}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default NotificationsPopout;
