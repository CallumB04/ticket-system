import { twMerge } from "tailwind-merge";

interface DividerProps {
    className?: string;
}

const Divider = ({ className }: DividerProps) => {
    return (
        <div className={twMerge("bg-layout-border h-px w-full", className)} />
    );
};

export default Divider;
