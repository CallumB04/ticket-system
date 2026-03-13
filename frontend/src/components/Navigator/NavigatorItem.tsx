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
                "text-text-secondary hover:text-text-primary flex h-full cursor-default items-center border-b-2 border-b-transparent px-4 text-sm transition-colors",
                active && "border-b-highlight text-text-primary"
            )}
        >
            {option.label}
        </div>
    );
};

export default NavigatorItem;
