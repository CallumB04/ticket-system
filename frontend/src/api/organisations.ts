import { api } from ".";

// Models

export type Organisation = {
    id: string;
    name: string;
    slug: string;
    logo_url: string | null;
    created_by: string; // uuid (owner)
    created_at: string; // ISO string
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

// Creates a new organisation with the signed in user as the owner
// Returns the new organisation
export async function createOrganisation(body: CreateOrganisationRequest) {
    const res = await api.post<Organisation>("/v1/organisations", body);
    return res.data;
}
