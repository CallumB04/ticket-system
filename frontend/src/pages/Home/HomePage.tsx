import { useState } from "react";
import {
    createOrganisation,
    fetchOrganisationMembers,
    fetchOrganisations,
    type OrganisationMember,
    type Organisation,
} from "../../api";
import { signIn, signUp } from "../../supabase/users";
import Button from "../../components/Button/Button";
import { useTheme } from "../../contexts/ThemeContext";
import { useUser } from "../../contexts/UserContext";
import Dropdown from "../../components/Dropdown/Dropdown";
import Input from "../../components/Input/Input";
import { updateUserProfile } from "../../api/profiles";

const HomePage = () => {
    const [orgs, setOrgs] = useState<Organisation[]>([]);
    const [members, setMembers] = useState<OrganisationMember[]>([]);

    const { theme, toggleTheme } = useTheme();

    const {
        sessionLoading,
        user,
        userProfile,
        userProfileLoading,
        refetchUserProfile,
        signOut,
    } = useUser();

    const createOrg = async () => {
        await createOrganisation({
            name: "AnotherOrg",
            slug: "another-org",
            logo_url: "example.com",
        });
    };

    const fetchOrgs = async () => {
        const resp = await fetchOrganisations();
        if (resp) {
            setOrgs(resp);
        }
    };

    const fetchMembers = async () => {
        const resp = await fetchOrganisationMembers(orgs[0].id);
        if (resp) {
            setMembers(resp);
            console.log(resp);
        }
    };

    return (
        <main className="space-y-1">
            <p className="text-text-primary">Home Page</p>
            <span className="flex gap-2">
                <Button
                    variant="primary"
                    onClick={() =>
                        signUp("callumburgoyne04@gmail.com", "abc123abc")
                    }
                >
                    Sign up
                </Button>
                <Button
                    variant="secondary"
                    onClick={() =>
                        signIn("callumburgoyne04@gmail.com", "abc123abc")
                    }
                >
                    Sign in
                </Button>
                <Button variant="secondary" onClick={() => signOut()}>
                    Sign out
                </Button>
            </span>
            <span className="mt-3 flex gap-2">
                <Button variant="primary" onClick={createOrg}>
                    Create test org
                </Button>
                <Button variant="secondary" onClick={fetchOrgs}>
                    Fetch orgs
                </Button>
                <Button variant="secondary" onClick={fetchMembers}>
                    Fetch members
                </Button>
            </span>
            <span className="mt-3 flex gap-2">
                <Button variant="primary" onClick={toggleTheme}>
                    Enable {theme === "light" ? "dark" : "light"} theme
                </Button>
            </span>
            <span className="mt-3 flex gap-2">
                <Button
                    variant="primary"
                    onClick={async () => {
                        const resp = await updateUserProfile({
                            first_name: "Callum",
                        });
                        if (resp) {
                            refetchUserProfile();
                        }
                    }}
                >
                    Update First Name to Callum
                </Button>
                <Button
                    variant="primary"
                    onClick={async () => {
                        const resp = await updateUserProfile({
                            first_name: "Ballum",
                        });
                        if (resp) {
                            refetchUserProfile();
                        }
                    }}
                >
                    Update First Name to Ballum
                </Button>
            </span>
            <p>{orgs.length === 0 ? "No orgs" : orgs.map((o) => o.name)}</p>
            <p>
                {members.length === 0
                    ? "No members"
                    : members.map((m) => (
                          <span>
                              {m.user.first_name
                                  ? m.user.first_name
                                  : "unknown name"}
                              {": "}
                              {m.role}
                              {m.user.country}
                          </span>
                      ))}
            </p>
            <p>{sessionLoading ? "loading email..." : user?.email}</p>
            {userProfileLoading ? (
                <p>Loading User Profile</p>
            ) : (
                <>
                    <p>
                        {userProfile
                            ? `First Name: ${userProfile.first_name}`
                            : "Loading first name"}
                    </p>
                    <p>
                        {userProfile
                            ? `Last Name: ${userProfile.last_name}`
                            : "Loading last name"}
                    </p>
                    <p>
                        {userProfile?.country
                            ? `Country: ${userProfile.country}`
                            : "No country data"}
                    </p>
                </>
            )}
            <Dropdown
                options={[
                    { label: "All options", value: "" },
                    { label: "Test 1", value: "test1" },
                    { label: "Test 2", value: "test2" },
                ]}
                label="Option Picker"
            />
            <Input defaultValue="example" label="Example" />
            <Input disabled defaultValue="example" label="Example" />
            <div className="bg-surface mt-2 size-20 rounded"></div>
            <div className="bg-surface-muted mt-2 size-20 rounded"></div>
        </main>
    );
};

export default HomePage;
