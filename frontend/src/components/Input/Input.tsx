import { type ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";
import InputLabel from "../Text/InputLabel";

interface InputProps {
    className?: string;
    containerClassName?: string; // div containing label and input
    type?: string;
    placeholder?: string;
    label?: string;
    defaultValue?: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
}

const Input = ({
    className,
    containerClassName,
    type,
    placeholder,
    label,
    defaultValue,
    disabled,
    onChange,
}: InputProps) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        // send new value to parent component
        if (onChange) {
            onChange(event.target.value);
        }
    };

    return (
        <div className={twMerge("space-y-1", containerClassName)}>
            {label && <InputLabel text={label} />}
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

export default Input;
