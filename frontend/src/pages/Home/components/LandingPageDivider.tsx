import { twMerge } from "tailwind-merge";
import Divider from "../../../components/Divider/Divider";

interface LandingPageDividerProps {
    className?: string;
    variant: "primary" | "secondary";
}

const LandingPageDivider = ({
    className,
    variant,
}: LandingPageDividerProps) => {
    if (variant === "primary") {
        return (
            <span
                className={twMerge(
                    "landing-page-divider bg-highlight absolute left-0 h-3.5 w-screen",
                    className
                )}
            />
        );
    }

    if (variant === "secondary") {
        return <Divider className="absolute left-0 w-screen" />;
    }
};

export default LandingPageDivider;
