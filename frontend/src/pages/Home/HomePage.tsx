import { useEffect, useState } from "react";
import {
    createOrganisation,
    fetchOrganisations,
    type Organisation,
} from "../../api";
import { signIn, signUp } from "../../supabase/users";
import { supabase } from "../../supabase/client";
import { type User } from "@supabase/supabase-js";

const HomePage = () => {
    const [orgs, setOrgs] = useState<Organisation[]>([]);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const createOrg = async () => {
        await createOrganisation({
            name: "10X Managers",
            description: "This is a test",
        });
    };

    const fetchOrgs = async () => {
        const resp = await fetchOrganisations();
        if (resp) {
            setOrgs(resp);
        }
    };

    const testSession = async () => {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
            console.error("Session error:", error);
            return;
        }

        console.log("Current session:", data.session);
    };

    return (
        <main>
            <p className="text-text-primary">Home Page</p>
            <span className="flex gap-2">
                <button
                    onClick={() =>
                        signUp("callumburgoyne04@gmail.com", "abc123abc")
                    }
                    className="bg-btn-primary hover:bg-btn-primary-hover text-btn-primary-text h-12 w-50 cursor-pointer rounded"
                >
                    Sign up
                </button>
                <button
                    onClick={() =>
                        signIn("callumburgoyne04@gmail.com", "abc123abc")
                    }
                    className="bg-btn-secondary hover:bg-btn-secondary-hover text-btn-secondary-text border-btn-secondary-border hover:border-btn-secondary-hover-border h-12 w-50 cursor-pointer rounded border-2"
                >
                    Sign in
                </button>
                <button
                    onClick={testSession}
                    className="bg-btn-secondary hover:bg-btn-secondary-hover text-btn-secondary-text border-btn-secondary-border hover:border-btn-secondary-hover-border h-12 w-50 cursor-pointer rounded border-2"
                >
                    Test Session
                </button>
            </span>
            <span className="mt-3 flex gap-2">
                <button
                    onClick={createOrg}
                    className="bg-btn-primary hover:bg-btn-primary-hover text-btn-primary-text h-12 w-50 cursor-pointer rounded"
                >
                    Create test org
                </button>
                <button
                    onClick={fetchOrgs}
                    className="bg-btn-secondary hover:bg-btn-secondary-hover text-btn-secondary-text border-btn-secondary-border hover:border-btn-secondary-hover-border h-12 w-50 cursor-pointer rounded border-2"
                >
                    Fetch orgs
                </button>
            </span>
            <p>{orgs.length === 0 ? "No orgs" : orgs.map((o) => o.name)}</p>
            <p>{user?.email}</p>
            <div className="bg-surface mt-2 size-20 rounded"></div>
            <div className="bg-surface-muted mt-2 size-20 rounded"></div>
        </main>
    );
};

export default HomePage;
