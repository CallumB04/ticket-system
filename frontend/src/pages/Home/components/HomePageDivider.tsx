import { twMerge } from "tailwind-merge";
import Divider from "../../../components/Divider/Divider";

interface HomePageDividerProps {
    className?: string;
    variant: "primary" | "secondary";
}

const HomePageDivider = ({ className, variant }: HomePageDividerProps) => {
    if (variant === "primary") {
        return (
            <span
                className={twMerge(
                    "home-page-divider bg-highlight absolute left-0 h-3.5 w-screen",
                    className
                )}
            />
        );
    }

    if (variant === "secondary") {
        return <Divider className="absolute left-0 w-screen" />;
    }
};

export default HomePageDivider;
