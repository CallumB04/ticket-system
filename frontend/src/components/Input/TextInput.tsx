import { type ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

interface TextInputProps {
    className?: string;
    type?: string;
    placeholder?: string;
    label?: string;
    defaultValue?: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
}

const TextInput = ({
    className,
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
        <div className={twMerge("space-y-1", className)}>
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
                className={twMerge(
                    "placeholder:text-text-placeholder text-text-primary border-input-border hover:border-input-border-hover bg-surface h-11 rounded border px-3 text-sm",
                    className
                )}
            />
        </div>
    );
};

export default TextInput;
