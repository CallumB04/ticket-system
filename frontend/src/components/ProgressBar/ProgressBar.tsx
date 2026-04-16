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
    const percent = Math.min((currentValue / targetValue) * 100, 100);

    return (
        <div className={twMerge("flex w-72 flex-col gap-2", className)}>
            {/* Labels */}
            <div className="flex items-baseline justify-between">
                <span className="text-text-primary font-mono text-sm font-medium">
                    {currentLabel}
                </span>
                <span className="text-text-disabled font-mono text-xs">
                    {targetLabel}
                </span>
            </div>
            {/* Bar */}
            <div className="bg-surface-muted h-2 w-full overflow-hidden rounded-full">
                <div
                    className={twMerge(
                        "h-full rounded-full transition-all duration-300",
                        percent >= 100 ? "bg-highlight" : "bg-highlight/70"
                    )}
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
