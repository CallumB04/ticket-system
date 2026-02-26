import { useState, type ChangeEvent } from "react";
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
    placeholder?: string;
    defaultValue?: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
}

const Dropdown = ({
    className,
    containerClassName,
    options,
    label,
    placeholder,
    defaultValue,
    disabled,
    onChange,
}: DropdownProps) => {
    const [value, setValue] = useState<string>(defaultValue ?? "");

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        // update state
        setValue(event.target.value);

        // send new value to parent component
        if (onChange) {
            onChange(event.target.value);
        }
    };

    return (
        <div className={twMerge("space-y-input-label", containerClassName)}>
            {label && <InputLabel text={label} />}
            <select
                defaultValue={defaultValue}
                disabled={disabled}
                onChange={handleChange}
                className={twMerge(
                    "input-default",
                    value === "" && "text-text-disabled!",
                    className
                )}
            >
                <option value="" disabled selected hidden className="">
                    {placeholder ?? "Choose an option"}
                </option>
                {options.map((o) => (
                    <option
                        key={o.value}
                        value={o.value}
                        className="text-text-primary"
                    >
                        {o.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
