import { useState } from "react";
import {
    createOrganisation,
    fetchOrganisations,
    type Organisation,
} from "../../api";
import { signIn, signUp } from "../../supabase/users";
import { useUser } from "../../hooks/useUser";

const HomePage = () => {
    const [orgs, setOrgs] = useState<Organisation[]>([]);

    const { sessionLoading, user, signOut } = useUser();

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
                    onClick={() => signOut()}
                    className="bg-btn-secondary hover:bg-btn-secondary-hover text-btn-secondary-text border-btn-secondary-border hover:border-btn-secondary-hover-border h-12 w-50 cursor-pointer rounded border-2"
                >
                    Sign out
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
            <p>{sessionLoading ? "loading email..." : user?.email}</p>
            <div className="bg-surface mt-2 size-20 rounded"></div>
            <div className="bg-surface-muted mt-2 size-20 rounded"></div>
        </main>
    );
};

export default HomePage;
