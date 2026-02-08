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

type UserContextType = {
    sessionLoading: boolean;
    user: User | null;
    userProfileLoading: boolean;
    userProfile: UserProfile | null;
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

    // User Profile
    const [userProfileLoading, setUserProfileLoading] =
        useState<boolean>(false);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

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
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setUserProfileLoading(true);
                const profile = await fetchUserProfile();
                if (profile) {
                    setUserProfile(profile);
                } else {
                    setUserProfile(null);
                }
            } catch (err) {
                setUserProfile(null);
                console.error("error fetching user profile:", err);
            } finally {
                setUserProfileLoading(false);
            }
        };

        fetchProfile();
    }, [session?.user?.id]);

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
                userProfileLoading,
                userProfile,
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
