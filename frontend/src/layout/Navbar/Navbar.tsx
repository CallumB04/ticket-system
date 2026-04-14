import { twMerge } from "tailwind-merge";
import Button from "../../components/Button/Button";
import LinkButton from "../../components/Button/LinkButton";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { usePopup } from "../../contexts/PopupContext";
import SignupLoginPopup from "../Popups/SignupLoginPopup";
import {
    BellIcon,
    MoonIcon,
    SunIcon,
    TextAlignJustifyIcon,
    XIcon,
} from "lucide-react";
import ClickableGroup from "../../components/ClickableGroup/ClickableGroup";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import { useRef, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import useClickOutside from "../../hooks/useClickOutside";
import { useSidebar } from "../../contexts/SidebarContext";
import AppLogo from "../../components/AppLogo/AppLogo";
import NotificationsPopout from "../Popouts/NotificationsPopout";
import UserProfilePopout from "../Popouts/UserProfilePopout";
import { fetchNotifications } from "../../api/notifications";
import { useQuery } from "@tanstack/react-query";

interface NavbarProps {
    className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
    const { sessionLoading, user, userProfile } = useUser();
    const { pushPopup, popPopup } = usePopup();
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const { isMobileSidebarOpen, toggleMobileSidebar } = useSidebar();

    // User Profile Popout
    const [profilePopoutOpen, setProfilePopoutOpen] = useState<boolean>(false);
    const profilePopoutRef = useRef<HTMLDivElement>(null);
    useClickOutside(profilePopoutRef, () => setProfilePopoutOpen(false)); // close when click outside

    // Notifications Popout
    const [notificationsPopoutOpen, setNotificationsPopoutOpen] =
        useState<boolean>(false);

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

    return (
        <nav
            className={twMerge(
                "bg-surface border-b-layout-border h-navbar-height fixed top-0 left-0 z-99 flex w-screen items-center border-b px-4 sm:px-6",
                className
            )}
        >
            <span className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4">
                {/* Logo / Brand text - Not visible on mobile unless on landing page */}
                <Link
                    to="/"
                    className={twMerge(
                        "text-text-primary font-medium tracking-wide",
                        location.pathname !== "/" && "hidden lg:block"
                    )}
                >
                    <AppLogo />
                </Link>
                {/* Hamburger Icon - Only visible on mobile - Opens Sidebar */}
                {location.pathname !== "/" && (
                    <ClickableGroup
                        className="lg:hidden"
                        onClick={toggleMobileSidebar}
                    >
                        {isMobileSidebarOpen ? (
                            <XIcon size={20} />
                        ) : (
                            <TextAlignJustifyIcon size={20} />
                        )}
                    </ClickableGroup>
                )}
                {/* Navbar options */}
                {sessionLoading ? (
                    <></>
                ) : user ? (
                    location.pathname === "/" ? (
                        <LinkButton
                            to="/dashboard"
                            variant="primary"
                            className="h-10 px-3"
                        >
                            Go to Dashboard
                        </LinkButton>
                    ) : (
                        <span className="flex gap-3">
                            {/* Light/Dark mode Icon */}
                            <ClickableGroup onClick={toggleTheme}>
                                {theme === "light" ? (
                                    <SunIcon
                                        size={20}
                                        className="text-yellow-400"
                                    />
                                ) : (
                                    <MoonIcon
                                        size={20}
                                        className="text-highlight"
                                    />
                                )}
                            </ClickableGroup>
                            {/* Notifications Icon - With Popout menu */}
                            <div className="relative">
                                <ClickableGroup
                                    onClick={() =>
                                        setNotificationsPopoutOpen(true)
                                    }
                                >
                                    <BellIcon size={20} />
                                    {/* Unread icons blue circle */}
                                    {notifications &&
                                        notifications?.filter((n) => !n.read)
                                            .length > 0 && (
                                            <div className="bg-highlight absolute top-1 right-1 size-2 rounded-full" />
                                        )}
                                </ClickableGroup>
                                {notificationsPopoutOpen && (
                                    <NotificationsPopout
                                        notifications={notifications}
                                        notificationsLoading={
                                            notificationsLoading
                                        }
                                        notificationsError={notificationsError}
                                        closePopout={() =>
                                            setNotificationsPopoutOpen(false)
                                        }
                                    />
                                )}
                            </div>
                            {/* User Profile Icon - With Popout menu */}
                            <div className="relative ml-1">
                                <UserAvatar
                                    profile={userProfile}
                                    onClick={() => setProfilePopoutOpen(true)}
                                />
                                {profilePopoutOpen && (
                                    <UserProfilePopout
                                        closePopout={() =>
                                            setProfilePopoutOpen(false)
                                        }
                                    />
                                )}
                            </div>
                        </span>
                    )
                ) : (
                    <span className="flex gap-2">
                        <Button
                            variant="secondary"
                            className="h-10 w-20 px-3"
                            onClick={() =>
                                pushPopup(
                                    <SignupLoginPopup
                                        closePopup={popPopup}
                                        initialState="login"
                                    />
                                )
                            }
                        >
                            Log in
                        </Button>
                        <Button
                            variant="primary"
                            className="h-10 w-20 px-3"
                            onClick={() =>
                                pushPopup(
                                    <SignupLoginPopup
                                        closePopup={popPopup}
                                        initialState="signup"
                                    />
                                )
                            }
                        >
                            Sign up
                        </Button>
                    </span>
                )}
            </span>
        </nav>
    );
};

export default Navbar;
