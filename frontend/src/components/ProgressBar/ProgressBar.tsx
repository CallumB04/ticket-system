import { twMerge } from "tailwind-merge";

interface ProgressBarProps {
    className?: string;
    target: number;
    value: number;
}

const ProgressBar = ({ className, target, value }: ProgressBarProps) => {
    return (
        <div
            className={twMerge(
                "border-input-border relative h-2.5 w-36 rounded-full border",
                className
            )}
        >
            <div
                className={twMerge(
                    "bg-highlight absolute top-0 left-0 h-2 rounded-l-full",
                    value === target && "rounded-r-full"
                )}
                style={{ width: `${(value / target) * 100}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
