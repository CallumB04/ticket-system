import { twMerge } from "tailwind-merge";

interface StatisticCardProps {
    className?: string;
    label: string;
    value: number;
    highlight?:
        | "default"
        | "resolved"
        | "in-progress"
        | "unassigned"
        | "paused"
        | "cancelled";
}

const getTicketStatusColor = (highlight: string) => {
    switch (highlight) {
        case "resolved":
            return "border-l-ticket-resolved";
        case "in-progress":
            return "border-l-ticket-inprogress";
        case "unassigned":
            return "border-l-ticket-unassigned";
        case "paused":
            return "border-l-ticket-paused";
        case "cancelled":
            return "border-l-ticket-cancelled";
        default:
            return "border-l-highlight";
    }
};

const StatisticCard = ({
    className,
    label,
    value,
    highlight,
}: StatisticCardProps) => {
    return (
        <div
            className={twMerge(
                "bg-surface border-surface-border flex flex-col gap-1.5 rounded-md border px-5 py-4",
                highlight && "border-l-3 " + getTicketStatusColor(highlight),
                className
            )}
        >
            <p className="text-text-secondary text-[13px] font-medium tracking-wide">
                {label}
            </p>
            <p className="text-text-primary font-mono text-[28px] leading-none font-medium tracking-tighter">
                {value === Math.floor(value) && value < 10 && "0"}
                {value}
            </p>
        </div>
    );
};

export default StatisticCard;
