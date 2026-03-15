import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import useWindowBounds from "../hooks/useWindowBounds";

type SidebarContextType = {
    isMobileSidebarOpen: boolean;
    openMobileSidebar: () => void;
    closeMobileSidebar: () => void;
    toggleMobileSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used with a SidebarProvider");
    }

    return context;
};

const SidebarProvider = ({ children }: { children: ReactNode }) => {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
    const { width } = useWindowBounds();

    // Close mobile sidebar if page width updates
    useEffect(() => {
        setMobileSidebarOpen(false);
    }, [width]);

    return (
        <SidebarContext.Provider
            value={{
                isMobileSidebarOpen: mobileSidebarOpen,
                openMobileSidebar: () => setMobileSidebarOpen(true),
                closeMobileSidebar: () => setMobileSidebarOpen(false),
                toggleMobileSidebar: () =>
                    setMobileSidebarOpen((prev) => !prev),
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export default SidebarProvider;
