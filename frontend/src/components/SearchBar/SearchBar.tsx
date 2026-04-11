import { type ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";
import InputLabel from "../Text/InputLabel";
import { SearchIcon } from "lucide-react";

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
            <div className="relative">
                <input
                    type="search"
                    placeholder={placeholder ?? "Search here..."}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    onChange={handleChange}
                    className={twMerge(
                        "input-default relative pl-10!",
                        className
                    )}
                />
                <SearchIcon
                    size={18}
                    className="absolute top-1/2 left-3 -translate-y-1/2"
                />
            </div>
        </div>
    );
};

export default SearchBar;
