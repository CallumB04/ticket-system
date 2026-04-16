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
                "text-text-secondary hover:text-text-primary flex h-full cursor-default items-center rounded px-3.5 font-mono text-[12px] tracking-[0.04em] transition-colors select-none",
                active &&
                    "text-background hover:text-background bg-text-primary"
            )}
        >
            {option.label}
        </div>
    );
};

export default NavigatorItem;
