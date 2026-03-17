import { useRef, useState } from "react";
import Popout from "../../components/Popout/Popout";
import ClickableText from "../../components/Text/ClickableText";
import { BellIcon } from "lucide-react";
import useClickOutside from "../../hooks/useClickOutside";
import { twMerge } from "tailwind-merge";

interface NotificationsPopoutProps {
    className?: string;
    closePopout: () => void;
}

const NotificationsPopout = ({
    className,
    closePopout,
}: NotificationsPopoutProps) => {
    const [notificationsShowAll, setNotificationsShowAll] =
        useState<boolean>(false);

    const popoutRef = useRef<HTMLDivElement>(null);
    useClickOutside(popoutRef, closePopout); // close when click outside

    return (
        <Popout
            xPos="left"
            yPos="bottom"
            className={twMerge("flex h-76 w-72 flex-col p-0", className)}
            ref={popoutRef}
            title="Notifications"
        >
            {/* No Notifications */}
            <div className="text-text-placeholder mt-16 flex w-full flex-col items-center gap-2.5">
                <BellIcon size={32} />
                <p className="text-sm">
                    No {notificationsShowAll ? "" : "new"} notifications
                </p>
                {!notificationsShowAll && (
                    <ClickableText
                        className="text-xs"
                        onClick={() => setNotificationsShowAll(true)}
                    >
                        View all
                    </ClickableText>
                )}
            </div>
        </Popout>
    );
};

export default NotificationsPopout;
