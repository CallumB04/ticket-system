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
            contentClassName={twMerge("flex flex-col gap-2", className)}
            ref={popoutRef}
            title={"Account"}
        >
            {/* Primary Actions */}
            <div className="flex min-w-52 flex-col gap-1">
                {/* My Profile */}
                <LinkButton
                    variant="secondary-transparent"
                    to="/profile"
                    onClick={closePopout}
                    linkClassName="w-full"
                    buttonClassName="h-10 w-full justify-start gap-3"
                >
                    <UserIcon size={18} />
                    My Profile
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
