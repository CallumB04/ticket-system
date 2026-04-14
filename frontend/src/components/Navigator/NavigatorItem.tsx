import { twMerge } from "tailwind-merge";
import type { NavigatorOption } from "./Navigator";

interface NavigatorItemProps {
    option: NavigatorOption;
    active?: boolean;
    onClick?: () => void;
}

const NavigatorItem = ({ option, active, onClick }: NavigatorItemProps) => {
    return (
        <div
            onClick={onClick}
            className={twMerge(
                "text-text-secondary hover:text-text-primary flex h-full cursor-default items-center rounded-xs px-4 font-mono text-sm transition-colors select-none",
                active && "text-surface hover:text-surface bg-highlight"
            )}
        >
            {option.label}
        </div>
    );
};

export default NavigatorItem;
