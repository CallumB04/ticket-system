import { useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import NavigatorItem from "./NavigatorItem";

export type NavigatorOption = {
    label: string;
    onClick?: () => void;
};

interface NavigatorProps {
    className?: string;
    options: NavigatorOption[];
    defaultOptionLabel?: string;
    onChange?: (option: NavigatorOption) => void;
}

const Navigator = ({
    className,
    options,
    defaultOptionLabel,
    onChange,
}: NavigatorProps) => {
    // set highlighted option by default or when inputs change
    const resolveOption = (optionLabel?: string): NavigatorOption => {
        if (optionLabel) {
            const matched = options.find((o) => o.label === optionLabel);
            if (matched) return matched;
        }

        return options[0];
    };

    // current highlighted option, defaults to first option if none provided
    const [activeOption, setActiveOption] = useState<NavigatorOption>(
        resolveOption(defaultOptionLabel)
    );

    // update state if options or default option changes
    useEffect(() => {
        setActiveOption((prev) => resolveOption(prev.label));
    }, [options, defaultOptionLabel]);

    const handleOptionClick = useCallback(
        (option: NavigatorOption) => {
            setActiveOption(option);
            if (option.onClick) option.onClick();
            if (onChange) onChange(option);
        },
        [onChange]
    );

    return (
        <div
            className={twMerge(
                "border-input-border bg-surface flex h-11 w-max gap-1 rounded-md border p-1",
                className
            )}
        >
            {options.map((o) => (
                <NavigatorItem
                    key={o.label}
                    option={o}
                    active={o === activeOption}
                    onClick={() => handleOptionClick(o)}
                />
            ))}
        </div>
    );
};

export default Navigator;
