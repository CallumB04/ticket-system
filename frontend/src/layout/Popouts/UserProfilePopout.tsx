import { useRef } from "react";
import Popout from "../../components/Popout/Popout";
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import useClickOutside from "../../hooks/useClickOutside";
import { twMerge } from "tailwind-merge";
import LinkButton from "../../components/Button/LinkButton";
import Divider from "../../components/Divider/Divider";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import { useUser } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

interface UserProfilePopoutProps {
    className?: string;
    closePopout: () => void;
}

const UserProfilePopout = ({
    className,
    closePopout,
}: UserProfilePopoutProps) => {
    const { user, userProfile, userProfileLoading, signOut } = useUser();
    const navigate = useNavigate();

    const popoutRef = useRef<HTMLDivElement>(null);
    useClickOutside(popoutRef, closePopout); // close when click outside

    const handleSignOut = () => {
        signOut();
        closePopout();
        navigate("/");
    };

    return (
        <Popout
            xPos="left"
            yPos="bottom"
            className={twMerge("flex max-w-60 flex-col gap-2", className)}
            ref={popoutRef}
        >
            {/* User Details */}
            <Card
                variant="highlight-muted"
                size="medium"
                className="w-full gap-0.5 rounded-lg"
            >
                <p className="text-text-primary text-sm font-semibold">
                    {userProfileLoading || !userProfile?.first_name
                        ? "Loading..."
                        : userProfile.first_name +
                          (userProfile?.last_name
                              ? " " + userProfile.last_name
                              : "")}
                </p>
                <p className="text-text-secondary text-xs break-all">
                    {user?.email ?? "Loading..."}
                </p>
            </Card>
            <Divider />
            {/* Primary Actions */}
            <div className="flex min-w-52 flex-col gap-1">
                {/* My Account */}
                <LinkButton
                    variant="secondary-transparent"
                    to="/account"
                    onClick={closePopout}
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
                    onClick={closePopout}
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
    );
};

export default UserProfilePopout;
