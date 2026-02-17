import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import PopupTitle from "./PopupTitle";
import PopupDescription from "./PopupDescription";
import { XIcon } from "lucide-react";

interface PopupProps {
    className?: string;
    children?: ReactNode;
    title: string;
    description?: string;
    preventClose?: boolean; // stop popup being closed by clicking outside or 'X' icon
    closePopup?: () => void;
}

const Popup = ({
    className,
    children,
    title,
    description,
    preventClose,
    closePopup,
}: PopupProps) => {
    return (
        <dialog
            className="fixed top-0 left-0 z-99 flex h-screen w-screen items-center justify-center bg-[#00000044] p-4 sm:p-8"
            onMouseDown={() => {
                if (closePopup && !preventClose) closePopup();
            }}
        >
            <div
                className={twMerge(
                    "bg-surface flex max-w-full flex-col gap-4 rounded-md p-4 shadow",
                    className
                )}
                // prevent popup close if mouse is dragged and unclicks outside popup
                onMouseDown={(e) => e.stopPropagation()}
            >
                {/* Popup Header */}
                <div className="flex flex-col gap-0.5">
                    <span className="flex justify-between gap-8 sm:gap-16">
                        {/* Title */}
                        <PopupTitle>{title}</PopupTitle>
                        {/* Close Popup Icon */}
                        {!preventClose && (
                            <XIcon
                                size={22}
                                className="hover:text-text-primary text-text-secondary shrink-0 cursor-pointer transition-colors duration-150"
                                onClick={closePopup}
                            />
                        )}
                    </span>
                    {/* Description (optional) */}
                    {description && (
                        <PopupDescription>{description}</PopupDescription>
                    )}
                </div>
                {/* Popup Contents */}
                {children}
            </div>
        </dialog>
    );
};

export default Popup;
