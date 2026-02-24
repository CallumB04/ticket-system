import { type ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

interface TextInputProps {
    className?: string;
    containerClassName?: string; // div containing label and input
    type?: string;
    placeholder?: string;
    label?: string;
    defaultValue?: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
}

const TextInput = ({
    className,
    containerClassName,
    type,
    placeholder,
    label,
    defaultValue,
    disabled,
    onChange,
}: TextInputProps) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        // send new value to parent component
        if (onChange) {
            onChange(event.target.value);
        }
    };

    return (
        <div className={twMerge("space-y-1", containerClassName)}>
            {label && (
                <p className="text-text-primary text-xs font-semibold">
                    {label}
                </p>
            )}
            <input
                type={type ?? "text"}
                placeholder={placeholder ?? "Type here..."}
                defaultValue={defaultValue}
                disabled={disabled}
                onChange={handleChange}
                className={twMerge("input-default", className)}
            />
        </div>
    );
};

export default TextInput;
