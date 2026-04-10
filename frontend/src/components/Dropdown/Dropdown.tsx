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
    value?: string;
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
    value,
    defaultValue,
    disabled,
    onChange,
}: DropdownProps) => {
    const [currentValue, setCurrentValue] = useState<string>(
        defaultValue ?? value ?? ""
    );

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        // update state
        setCurrentValue(event.target.value);

        // send new value to parent component
        if (onChange) {
            onChange(event.target.value);
        }
    };

    return (
        <div className={twMerge("space-y-input-label", containerClassName)}>
            {label && <InputLabel text={label} />}
            <select
                value={value}
                defaultValue={defaultValue}
                disabled={disabled}
                onChange={handleChange}
                className={twMerge(
                    "input-default",
                    currentValue === "" && !value && "text-text-disabled!",
                    className
                )}
            >
                <option value="" disabled hidden className="">
                    {placeholder ?? "Choose an option..."}
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
