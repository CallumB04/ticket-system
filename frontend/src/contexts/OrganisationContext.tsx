import { createContext, useContext, useState, type ReactNode } from "react";
import type { Organisation } from "../api";

type OrganisationContextType = {
    activeOrganisation: Organisation | undefined;
    setActiveOrganisation: (org: Organisation | undefined) => void;
};

const OrganisationContext = createContext<OrganisationContextType | undefined>(
    undefined
);

export const useOrganisation = () => {
    const context = useContext(OrganisationContext);
    if (!context) {
        throw new Error(
            "useOrganisation must be used within an OrganisationProvider"
        );
    }

    return context;
};

export const OrganisationProvider = ({ children }: { children: ReactNode }) => {
    const [activeOrganisation, setActiveOrganisation] = useState<
        Organisation | undefined
    >(undefined);

    return (
        <OrganisationContext.Provider
            value={{ activeOrganisation, setActiveOrganisation }}
        >
            {children}
        </OrganisationContext.Provider>
    );
};
