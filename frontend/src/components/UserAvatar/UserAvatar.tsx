import { twMerge } from "tailwind-merge";
import type { UserProfile } from "../../api/profiles";
import { EllipsisIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface UserAvatarProps {
    className?: string;
    profile: UserProfile | undefined;
    to?: string;
    onClick?: () => void;
}

const UserAvatar = ({ className, profile, to, onClick }: UserAvatarProps) => {
    // React router Link element if 'to' provided
    if (to) {
        <Link to={to}>
            <Avatar
                className={twMerge(
                    "hover:border-highlight/50 cursor-pointer",
                    className
                )}
                profile={profile}
                onClick={onClick}
            />
        </Link>;
    }

    // Standard avatar without Link elements
    return <Avatar className={className} profile={profile} onClick={onClick} />;
};

// Base avatar JSX, used within parent component
const Avatar = ({ className, profile, onClick }: UserAvatarProps) => {
    return (
        <div
            className={twMerge(
                "border-highlight/30 bg-highlight/15 flex size-9 items-center justify-center rounded-full border text-center",
                onClick && "hover:border-highlight/50 cursor-pointer",
                className
            )}
            onClick={onClick}
        >
            {profile ? (
                <p className="text-highlight text-sm font-semibold uppercase select-none">
                    {profile.first_name[0] +
                        (profile.last_name ? profile.last_name[0] : "")}
                </p>
            ) : (
                <EllipsisIcon className="text-highlight" size={20} />
            )}
        </div>
    );
};

export default UserAvatar;
