import { createContext, useContext, useState, type ReactNode } from "react";

type PopupContextType = {
    popupStack: ReactNode[];
    pushPopup: (popup: ReactNode) => void;
    popPopup: () => void;
    clearPopupStack: () => void;
};

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const usePopup = () => {
    const context = useContext(PopupContext);
    if (!context) {
        throw new Error("usePopup must be used within a PopupProvider");
    }

    return context;
};

export const PopupProvider = ({ children }: { children: ReactNode }) => {
    const [popupStack, setPopupStack] = useState<ReactNode[]>([]);

    const pushPopup = (popup: ReactNode) => {
        setPopupStack((prev) => [popup, ...prev]);
    };

    const popPopup = () => {
        setPopupStack((prev) =>
            prev.slice(Math.min(1, prev.length), prev.length)
        );
    };

    const clearPopupStack = () => {
        setPopupStack([]);
    };

    return (
        <PopupContext.Provider
            value={{
                popupStack,
                pushPopup,
                popPopup,
                clearPopupStack,
            }}
        >
            {children}
        </PopupContext.Provider>
    );
};
