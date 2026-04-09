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
                "border-input-border relative h-11 w-72 rounded-xs border",
                className
            )}
        >
            <div
                className={twMerge(
                    "from-highlight/80 to-highlight/20 absolute top-0 left-0 flex h-10.5 items-center rounded-l-xs bg-linear-90",
                    value === target && "rounded-r-xs",
                    value !== target &&
                        value > 0 &&
                        "border-r-input-border border-r",
                    value > 0 ? "justify-end" : "justify-start"
                )}
                style={{ width: `${(value / target) * 100}%` }}
            >
                {value !== target && (
                    <p
                        className={twMerge(
                            "font-mono",
                            value > 0 ? "mr-3" : "ml-3"
                        )}
                    >
                        {value}
                    </p>
                )}
            </div>
            <p className="absolute top-1/2 right-3 -translate-y-1/2 transform font-mono">
                {target}
            </p>
        </div>
    );
};

export default ProgressBar;
