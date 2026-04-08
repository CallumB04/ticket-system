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

export type OrganisationRole = "owner" | "admin" | "member";

export type OrganisationMember = {
    user: UserProfile;
    role: OrganisationRole; // owner / admin / member
    joined_at: string; // ISO string
};

export type CreateOrganisationRequest = {
    name: string;
    logo_url?: string;
};

// API Calls

// Fetches all organisations of the signed in user
export const fetchOrganisations = async () => {
    const res = await api.get<Organisation[]>("/v1/organisations");
    return res.data;
};

// Fetches all members of an organisations
export const fetchOrganisationMembers = async (org_id: string) => {
    const res = await api.get<OrganisationMember[]>(
        "/v1/organisations/" + org_id + "/members"
    );
    return res.data;
};

// Creates a new organisation with the signed in user as the owner
// Returns the new organisation
export const createOrganisation = async (body: CreateOrganisationRequest) => {
    const res = await api.post<Organisation>("/v1/organisations", body);
    return res.data;
};
