import { TicketIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface AppLogoProps {
    className?: string;
}

const AppLogo = ({ className }: AppLogoProps) => {
    return (
        <span
            className={twMerge(
                "text-text-primary flex items-center gap-2",
                className
            )}
        >
            <TicketIcon size={24} />
            <p>booth</p>
        </span>
    );
};

export default AppLogo;
