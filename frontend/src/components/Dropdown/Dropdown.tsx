import { type ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";
import InputLabel from "../Text/InputLabel";

export type DropdownOption = {
    label: string;
    value: string;
};

interface DropdownProps {
    className?: string;
    containerClassName?: string; // div containing label and dropdown
    options: DropdownOption[];
    label?: string;
    defaultOption?: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
}

const Dropdown = ({
    className,
    containerClassName,
    options,
    label,
    defaultOption,
    disabled,
    onChange,
}: DropdownProps) => {
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        // send new value to parent component
        if (onChange) {
            onChange(event.target.value);
        }
    };

    return (
        <div className={twMerge("space-y-input-label", containerClassName)}>
            {label && <InputLabel text={label} />}
            <select
                defaultValue={defaultOption}
                disabled={disabled}
                onChange={handleChange}
                className={twMerge("input-default", className)}
            >
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
