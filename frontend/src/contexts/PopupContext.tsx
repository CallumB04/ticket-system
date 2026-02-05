import { createContext, useContext, useState, type ReactNode } from "react";

type PopupContextType = {
    popupStack: ReactNode[];
    pushPopup: (popup: ReactNode, replace?: boolean) => void;
    popPopup: () => void;
    clearPopupStack: () => void;
};

const PopupContext = createContext<PopupContextType | undefined>(undefined);

// Hook to allow all pages / components around the site to render and close every popup
export const usePopup = () => {
    const context = useContext(PopupContext);
    if (!context) {
        throw new Error("usePopup must be used within a PopupProvider");
    }

    return context;
};

export const PopupProvider = ({ children }: { children: ReactNode }) => {
    const [popupStack, setPopupStack] = useState<ReactNode[]>([]);

    // Add popup onto the top of the stack
    // Popup at the top position in the stack will be rendered to the page
    // Replace - removes current popup before displaying new one
    const pushPopup = (popup: ReactNode, replace?: boolean) => {
        if (replace) popPopup(); // remove popup at top position of stack before displaying new popup
        setPopupStack((prev) => [popup, ...prev]);
    };

    // Remove popup currently at top position of the stack
    // This closes the popup and renders any other popups underneath it on the stack in order
    const popPopup = () => {
        setPopupStack((prev) =>
            prev.slice(Math.min(1, prev.length), prev.length)
        );
    };

    // Closes all popups
    // Useful for redirects, etc
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
