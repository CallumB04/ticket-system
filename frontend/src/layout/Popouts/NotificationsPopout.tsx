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
            className={twMerge(
                "flex h-72 w-88 flex-col overflow-y-scroll",
                className
            )}
            ref={popoutRef}
            title="Notifications"
        >
            {notificationsLoading ? (
                // Loading Notifications
                <LoadingSpinner variant="surface" className="mx-auto mt-12" />
            ) : notifications && notifications?.length >= 1 ? (
                // Notifications
                <div className="flex w-full flex-col gap-1">
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
        <ClickableGroup className="w-full items-start gap-3">
            {getIconFromNotificationType(notification.type)}
            <div className="flex-1 space-y-1">
                {!notification.read && (
                    <p className="bg-highlight/20 border-highlight/50 text-highlight w-max rounded-full border px-1.5 py-0.5 text-[11px]">
                        New
                    </p>
                )}
                <p
                    className={twMerge(
                        "text-text-primary text-sm",
                        !notification.read && "font-medium"
                    )}
                >
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
