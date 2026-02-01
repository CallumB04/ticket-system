import { useCallback, useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../supabase/client";

interface AuthState {
    sessionLoading: boolean;
    user: User | null;
    signOut: () => Promise<void>;
}

// Provides the current Supabase auth state
export function useUser(): AuthState {
    const [loading, setLoading] = useState(true);
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
                if (mounted) setLoading(false);
            }
        })();

        // Subscribe to auth changes (sign in / sign out / token refresh)
        const { data } = supabase.auth.onAuthStateChange(
            (_event, newSession) => {
                if (!mounted) return;
                setSession(newSession ?? null);
                setLoading(false);
            }
        );

        return () => {
            mounted = false;
            data.subscription.unsubscribe();
        };
    }, []);

    // Logs out user and refreshes session
    const signOutUser = useCallback(async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("error signing out:", error);
            throw error;
        }
    }, []);

    return {
        sessionLoading: loading,
        user: session?.user ?? null,
        signOut: signOutUser,
    };
}
