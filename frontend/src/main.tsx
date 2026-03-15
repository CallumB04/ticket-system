import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { UserProvider } from "./contexts/UserContext.tsx";
import { PopupProvider } from "./contexts/PopupContext.tsx";
import SidebarProvider from "./contexts/SidebarContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <PopupProvider>
                <UserProvider>
                    <ThemeProvider>
                        <SidebarProvider>
                            <App />
                        </SidebarProvider>
                    </ThemeProvider>
                </UserProvider>
            </PopupProvider>
        </QueryClientProvider>
    </StrictMode>
);
