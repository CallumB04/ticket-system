import { api } from ".";

// Models

export type Organisation = {
    id: number;
    name: string;
    description: string | null;
    created_at: string; // ISO string
    created_by: string; // uuid (owner)
};

export type CreateOrganisationRequest = {
    name: string;
    description?: string;
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
