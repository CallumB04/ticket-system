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
            <TicketIcon size={22} className="text-highlight" />
            <p className="font-[Plus_Jakarta_Sans] text-[15px] font-medium tracking-tight">
                booth
            </p>
        </span>
    );
};

export default AppLogo;
