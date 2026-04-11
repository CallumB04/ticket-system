import { twMerge } from "tailwind-merge";
import Card from "../Card/Card";

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

const StatisticCard = ({
    className,
    label,
    value,
    highlight,
}: StatisticCardProps) => {
    return (
        <Card className={twMerge("", className)}>
            <p className="text-text-primary">{label}</p>
            <p className="text-text-primary font-mono text-2xl">
                {value === Math.floor(value) && value < 10 && "0"}
                {value}
            </p>
            {highlight && (
                <span
                    className={twMerge(
                        "h-1 w-full rounded-full",
                        highlight === "default" && "bg-highlight",
                        highlight === "resolved" && "bg-ticket-resolved",
                        highlight === "in-progress" && "bg-ticket-inprogress",
                        highlight === "unassigned" && "bg-ticket-unassigned",
                        highlight === "paused" && "bg-ticket-paused",
                        highlight === "cancelled" && "bg-ticket-cancelled"
                    )}
                />
            )}
        </Card>
    );
};

export default StatisticCard;
