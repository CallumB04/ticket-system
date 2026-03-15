import { twMerge } from "tailwind-merge";
import Button from "../../components/Button/Button";
import LinkButton from "../../components/Button/LinkButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import { usePopup } from "../../contexts/PopupContext";
import SignupLoginPopup from "../Popups/SignupLoginPopup";
import { BellIcon, LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import ClickableGroup from "../../components/ClickableGroup/ClickableGroup";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import { useRef, useState } from "react";
import Popout from "../../components/Popout/Popout";
import Card from "../../components/Card/Card";
import Divider from "../../components/Divider/Divider";
import { useClickOutside } from "../../hooks/useClickOutside";

interface NavbarProps {
    className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
    const { sessionLoading, user, userProfile, userProfileLoading, signOut } =
        useUser();
    const { pushPopup, popPopup } = usePopup();
    const location = useLocation();
    const navigate = useNavigate();

    const [profilePopoutOpen, setProfilePopoutOpen] = useState<boolean>(false);
    const profilePopoutRef = useRef<HTMLDivElement>(null);

    // close profile popout if user clicks outside of the popout
    useClickOutside(profilePopoutRef, () => setProfilePopoutOpen(false));

    const handleSignOut = () => {
        signOut();
        setProfilePopoutOpen(false);
        navigate("/");
    };

    return (
        <nav
            className={twMerge(
                "bg-surface border-b-layout-border h-navbar-height fixed top-0 left-0 flex w-screen items-center border-b px-4 sm:px-6",
                className
            )}
        >
            <span className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4">
                {/* Logo / Brand text */}
                <Link
                    to="/"
                    className="text-text-primary font-medium tracking-wide"
                >
                    Ticket System
                </Link>
                {/* Navbar options */}
                {sessionLoading ? (
                    <></>
                ) : user ? (
                    location.pathname === "/" ? (
                        <LinkButton
                            to="/dashboard"
                            variant="primary"
                            className="h-11"
                        >
                            Go to Dashboard
                        </LinkButton>
                    ) : (
                        <span className="flex gap-2">
                            {/* Notifications Icon */}
                            <ClickableGroup className="rounded-full">
                                <BellIcon size={20} />
                            </ClickableGroup>
                            {/* User Profile Icon - With Popout menu */}
                            <div className="relative">
                                <UserAvatar
                                    profile={userProfile}
                                    onClick={() => setProfilePopoutOpen(true)}
                                />
                                {profilePopoutOpen && (
                                    <Popout
                                        xPos="left"
                                        yPos="bottom"
                                        className="flex flex-col gap-2"
                                        ref={profilePopoutRef}
                                    >
                                        {/* User Details */}
                                        <Card
                                            variant="highlight-muted"
                                            size="medium"
                                            className="w-full gap-0.5 rounded-lg"
                                        >
                                            <p className="text-text-primary text-sm font-semibold">
                                                {userProfileLoading ||
                                                !userProfile?.first_name
                                                    ? "Loading..."
                                                    : userProfile.first_name +
                                                      (userProfile?.last_name
                                                          ? " " +
                                                            userProfile.last_name
                                                          : "")}
                                            </p>
                                            <p className="text-text-secondary text-xs">
                                                {user.email ?? "Loading..."}
                                            </p>
                                        </Card>
                                        <Divider />
                                        {/* Primary Actions */}
                                        <div className="flex w-52 flex-col gap-1">
                                            {/* My Account */}
                                            <LinkButton
                                                variant="secondary-transparent"
                                                to="/account"
                                                onClick={() =>
                                                    setProfilePopoutOpen(false)
                                                }
                                                linkClassName="w-full"
                                                buttonClassName="h-10 w-full justify-start gap-3"
                                            >
                                                <UserIcon size={18} />
                                                My Account
                                            </LinkButton>
                                            {/* Settings */}
                                            <LinkButton
                                                variant="secondary-transparent"
                                                to="/settings"
                                                onClick={() =>
                                                    setProfilePopoutOpen(false)
                                                }
                                                className="w-full"
                                                buttonClassName="h-10 justify-start gap-3"
                                            >
                                                <SettingsIcon size={18} />
                                                Settings
                                            </LinkButton>
                                        </div>
                                        <Divider />
                                        {/* Sign Out */}
                                        <Button
                                            variant="danger-transparent"
                                            className="h-10 w-full justify-start gap-3"
                                            onClick={handleSignOut}
                                        >
                                            <LogOutIcon size={18} />
                                            Sign out
                                        </Button>
                                    </Popout>
                                )}
                            </div>
                        </span>
                    )
                ) : (
                    <span className="flex gap-2">
                        <Button
                            variant="primary"
                            className="h-11 w-22"
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
                        <Button
                            variant="secondary"
                            className="h-11 w-22"
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
                    </span>
                )}
            </span>
        </nav>
    );
};

export default Navbar;
