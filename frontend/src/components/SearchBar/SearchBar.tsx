import { type ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";
import InputLabel from "../Text/InputLabel";

interface SearchBarProps {
    className?: string;
    containerClassName?: string; // div containing label and input
    placeholder?: string;
    label?: string;
    defaultValue?: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
}

const SearchBar = ({
    className,
    containerClassName,
    placeholder,
    label,
    defaultValue,
    disabled,
    onChange,
}: SearchBarProps) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        // send new value to parent component
        if (onChange) {
            onChange(event.target.value);
        }
    };

    return (
        <div className={twMerge("space-y-input-label", containerClassName)}>
            {label && <InputLabel text={label} />}
            <input
                type="search"
                placeholder={placeholder ?? "Search here..."}
                defaultValue={defaultValue}
                disabled={disabled}
                onChange={handleChange}
                className={twMerge("input-default", className)}
            />
        </div>
    );
};

export default SearchBar;
