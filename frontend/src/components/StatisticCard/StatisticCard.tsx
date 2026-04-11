import { twMerge } from "tailwind-merge";
import Card from "../Card/Card";

interface StatisticCardProps {
    className?: string;
    label: string;
    value: number;
}

const StatisticCard = ({ className, label, value }: StatisticCardProps) => {
    return (
        <Card className={twMerge("", className)}>
            <p className="text-text-primary">{label}</p>
            <p className="text-text-primary font-mono text-2xl">
                {value === Math.floor(value) && value < 10 && "0"}
                {value}
            </p>
            <span className="bg-highlight h-1 w-full rounded-full" />
        </Card>
    );
};

export default StatisticCard;
