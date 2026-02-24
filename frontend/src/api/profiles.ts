// Models

import { api } from ".";

export type UserProfile = {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url: string;
    country: string;
    created_at: string;
};

// API Calls

// Fetches user profile of the signed in user
export async function fetchUserProfile() {
    const res = await api.get<UserProfile>("/v1/profile");
    return res.data;
}
