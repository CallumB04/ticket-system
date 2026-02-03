import { useState } from "react";
import {
    createOrganisation,
    fetchOrganisationMembers,
    fetchOrganisations,
    type OrganisationMember,
    type Organisation,
} from "../../api";
import { signIn, signUp } from "../../supabase/users";
import { useUser } from "../../hooks/useUser";
import Popup from "../../components/Popup/Popup";
import Button from "../../components/Button/Button";
import PopupButtonsContainer from "../../components/Popup/PopupButtonsContainer";

const HomePage = () => {
    const [orgs, setOrgs] = useState<Organisation[]>([]);
    const [members, setMembers] = useState<OrganisationMember[]>([]);
    const [testPopupOpen, setTestPopupOpen] = useState<boolean>(false);

    const { sessionLoading, user, signOut } = useUser();

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
        <main>
            {testPopupOpen && (
                <Popup
                    title="Test Popup"
                    description="This is a popup for testing purposes"
                    closePopup={() => setTestPopupOpen(false)}
                >
                    <p className="text-text-primary">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Soluta explicabo non dolores facere tempore
                        consequatur placeat, reiciendis consectetur dolore quo
                        pariatur, eum itaque provident unde beatae, voluptates
                        nisi deleniti! Neque.
                    </p>
                    <PopupButtonsContainer>
                        <Button variant="secondary" className="w-full">
                            Close
                        </Button>
                        <Button variant="primary" className="w-full">
                            Confirm
                        </Button>
                    </PopupButtonsContainer>
                </Popup>
            )}
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
                <Button
                    variant="primary"
                    onClick={() => setTestPopupOpen(true)}
                >
                    Open Test Popup
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
                          </span>
                      ))}
            </p>
            <p>{sessionLoading ? "loading email..." : user?.email}</p>
            <div className="bg-surface mt-2 size-20 rounded"></div>
            <div className="bg-surface-muted mt-2 size-20 rounded"></div>
        </main>
    );
};

export default HomePage;
