import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";
import { PopupProvider } from "./contexts/PopupContext.tsx";
import SidebarProvider from "./contexts/SidebarContext.tsx";
import { OrganisationProvider } from "./contexts/OrganisationContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <PopupProvider>
                <UserProvider>
                    <OrganisationProvider>
                        <ThemeProvider>
                            <SidebarProvider>
                                <App />
                            </SidebarProvider>
                        </ThemeProvider>
                    </OrganisationProvider>
                </UserProvider>
            </PopupProvider>
        </QueryClientProvider>
    </StrictMode>
);
