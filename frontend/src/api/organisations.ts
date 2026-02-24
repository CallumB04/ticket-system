import { api } from ".";
import type { UserProfile } from "./profiles";

// Models

export type Organisation = {
    id: string;
    name: string;
    slug: string;
    logo_url: string;
    created_by: string; // uuid (owner)
    created_at: string; // ISO string
};

export type OrganisationMember = {
    user: UserProfile;
    role: string; // owner / admin / member
    joined_at: string; // ISO string
};

export type CreateOrganisationRequest = {
    name: string;
    slug: string;
    logo_url?: string;
};

// API Calls

// Fetches all organisations of the signed in user
export async function fetchOrganisations() {
    const res = await api.get<Organisation[]>("/v1/organisations");
    return res.data;
}

// Fetches all members of an organisations
export async function fetchOrganisationMembers(org_id: string) {
    const res = await api.get<OrganisationMember[]>(
        "/v1/organisations/" + org_id + "/members"
    );
    return res.data;
}

// Creates a new organisation with the signed in user as the owner
// Returns the new organisation
export async function createOrganisation(body: CreateOrganisationRequest) {
    const res = await api.post<Organisation>("/v1/organisations", body);
    return res.data;
}
