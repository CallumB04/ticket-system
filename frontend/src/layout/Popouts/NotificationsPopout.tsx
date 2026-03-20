import { useEffect, useRef } from "react";
import Popout from "../../components/Popout/Popout";
import { BellIcon, Building2Icon, SproutIcon } from "lucide-react";
import useClickOutside from "../../hooks/useClickOutside";
import { twMerge } from "tailwind-merge";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../contexts/UserContext";
import {
    fetchNotifications,
    type Notification,
    type NotificationType,
} from "../../api/notifications";
import ClickableGroup from "../../components/ClickableGroup/ClickableGroup";
import { getDaysAgoFromISO } from "../../util/date";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

interface NotificationsPopoutProps {
    className?: string;
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
    closePopout,
}: NotificationsPopoutProps) => {
    const { user } = useUser();

    const popoutRef = useRef<HTMLDivElement>(null);
    useClickOutside(popoutRef, closePopout); // close when click outside

    // Load notifications on component mount
    const {
        data: notifications,
        isLoading: notificationsLoading,
        error: notificationsError,
    } = useQuery({
        queryKey: ["notifications", user?.id], // refetch when user changes
        queryFn: async () => {
            const notis = await fetchNotifications();
            return notis ?? [];
        },
    });

    // Notify user when notifications fetch errors
    // TODO: Replace alert with Toast when Toaster is built
    useEffect(() => {
        if (notificationsError) {
            alert("Notifications error");
        }
    }, [notificationsError]);

    return (
        <Popout
            xPos="left"
            yPos="bottom"
            className={twMerge("flex h-72 w-88 flex-col", className)}
            contentClassName="p-0 overflow-y-scroll"
            ref={popoutRef}
            title="Notifications"
        >
            {notificationsLoading ? (
                // Loading Notifications
                <LoadingSpinner variant="surface" className="mx-auto mt-12" />
            ) : notifications && notifications?.length >= 1 ? (
                // Notifications
                <div className="flex w-full flex-col">
                    {notifications.map((n) => (
                        <NotificationPopoutItem notification={n} />
                    ))}
                </div>
            ) : (
                // No notifications
                <div className="text-text-placeholder mt-12 flex w-full flex-col items-center gap-2.5">
                    <BellIcon size={32} />
                    <p className="text-sm">No notifications</p>
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
    return (
        <ClickableGroup
            className={twMerge(
                "not-last-of-type:border-b-layout-border w-full items-start gap-3 rounded-none not-last-of-type:border-b",
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
                <p className="text-text-primary text-sm">
                    {notification.description}
                </p>
                <p className="text-text-secondary text-xs">
                    {getDaysAgoFromISO(notification.created_at)}
                </p>
            </div>
        </ClickableGroup>
    );
};

export default NotificationsPopout;
