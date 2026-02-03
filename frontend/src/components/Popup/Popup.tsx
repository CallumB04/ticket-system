import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import PopupTitle from "./PopupTitle";
import PopupDescription from "./PopupDescription";
import { X } from "lucide-react";

interface PopupProps {
    className?: string;
    children?: ReactNode;
    title: string;
    description?: string;
    closePopup?: () => void;
}

const Popup = ({
    className,
    children,
    title,
    description,
    closePopup,
}: PopupProps) => {
    return (
        <dialog
            className="fixed top-0 left-0 z-99 flex h-screen w-screen items-center justify-center bg-[#00000044] p-4 sm:p-8"
            onMouseDown={closePopup && closePopup}
        >
            <div
                className={twMerge(
                    "bg-surface flex w-max max-w-200 flex-col gap-4 rounded-md p-4 shadow",
                    className
                )}
                // prevent popup close if mouse is dragged and unclicks outside popup
                onMouseDown={(e) => e.stopPropagation()}
            >
                {/* Popup Header */}
                <span className="flex justify-between gap-8">
                    {/* Title + Description (optional) */}
                    <div className="flex flex-col gap-1">
                        <PopupTitle>{title}</PopupTitle>
                        {description && (
                            <PopupDescription>{description}</PopupDescription>
                        )}
                    </div>
                    {/* Close Popup Icon */}
                    <X
                        size={22}
                        className="hover:text-text-primary text-text-secondary cursor-pointer transition-colors duration-150"
                        onClick={closePopup}
                    />
                </span>
                {/* Popup Contents */}
                {children}
            </div>
        </dialog>
    );
};

export default Popup;
