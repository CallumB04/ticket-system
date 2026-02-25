import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../supabase/client";
import { Navigate, Outlet } from "react-router-dom";
import { fetchUserProfile, type UserProfile } from "../api/profiles";
import { useQuery } from "@tanstack/react-query";

type UserContextType = {
    sessionLoading: boolean;
    user: User | null;
    userProfile: UserProfile | undefined;
    userProfileLoading: boolean;
    userProfileError: Error | null;
    refetchUserProfile: () => void;
    signOut: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }

    return context;
};

// Provides the current Supabase auth state
export const UserProvider = ({ children }: { children: ReactNode }) => {
    // Session
    const [sessionLoading, setSessionLoading] = useState<boolean>(true);
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        // Ensures component is mounted before updating state
        let mounted = true;

        // Get current user session and store in state
        // Will return null if user is logged out or session retrieval errors
        (async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                if (!mounted) return;
                if (error) console.error("error getting session:", error);
                setSession(data.session ?? null);
            } catch (err) {
                if (!mounted) return;
                console.error("unexpected error getting session:", err);
                setSession(null);
            } finally {
                if (mounted) setSessionLoading(false);
            }
        })();

        // Subscribe to auth changes (sign in / sign out / token refresh)
        const { data } = supabase.auth.onAuthStateChange(
            (_event, newSession) => {
                if (!mounted) return;
                setSession(newSession ?? null);
                setSessionLoading(false);
            }
        );

        return () => {
            mounted = false;
            data.subscription.unsubscribe();
        };
    }, []);

    // Refetch user profile when user ID changes in session
    const {
        data: userProfile,
        isLoading: userProfileLoading,
        error: userProfileError,
        refetch: refetchUserProfile,
    } = useQuery({
        queryKey: ["userProfile", session?.user?.id], // refetch when user id changes
        queryFn: async () => {
            const profile = await fetchUserProfile();
            return profile ?? null;
        },
        enabled: !!session?.user?.id, // only run if user exists
    });

    // Logs out user and refreshes session
    const signOutUser = useCallback(async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("error signing out:", error);
            throw error;
        }
    }, []);

    return (
        <UserContext.Provider
            value={{
                sessionLoading,
                user: session?.user ?? null,
                userProfile,
                userProfileLoading,
                userProfileError,
                refetchUserProfile,
                signOut: signOutUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

// Wraps protected routes to ensure user is logged in
export const RequireUser = () => {
    const { user, sessionLoading } = useUser();

    if (sessionLoading) {
        return <h1>Loading...</h1>;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
