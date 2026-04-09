import { twMerge } from "tailwind-merge";

interface ProgressBarProps {
    className?: string;
    targetValue: number;
    targetLabel: string;
    currentValue: number;
    currentLabel: string;
}

const ProgressBar = ({
    className,
    targetValue,
    targetLabel,
    currentValue,
    currentLabel,
}: ProgressBarProps) => {
    return (
        <div
            className={twMerge(
                "border-input-border relative h-11 w-72 rounded-xs border",
                className
            )}
        >
            <div
                className={twMerge(
                    "from-highlight/80 to-highlight/20 absolute top-0 left-0 flex h-10.5 items-center rounded-l-xs bg-linear-90",
                    currentValue === targetValue && "rounded-r-xs",
                    currentValue !== targetValue &&
                        currentValue > 0 &&
                        "border-r-input-border border-r",
                    currentValue > 0 ? "justify-end" : "justify-start"
                )}
                style={{ width: `${(currentValue / targetValue) * 100}%` }}
            >
                {currentValue !== targetValue && (
                    <p
                        className={twMerge(
                            "text-text-primary font-mono text-sm",
                            currentValue > 0 ? "mr-3" : "ml-3"
                        )}
                    >
                        {currentLabel}
                    </p>
                )}
            </div>
            <p className="text-text-primary absolute top-1/2 right-3 -translate-y-1/2 transform font-mono text-sm">
                {targetLabel}
            </p>
        </div>
    );
};

export default ProgressBar;
