import { api } from ".";

// Models

export type UserProfile = {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url: string;
    country: string;
    created_at: string;
};

export type UpdateUserProfileRequest = {
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
    country: string | null;
};

// API Calls

// Fetches user profile of the signed in user
export async function fetchUserProfile() {
    const res = await api.get<UserProfile>("/v1/profile");
    return res.data;
}

// Updates fields of the signed in user's profile, and receive new profile data
export async function updateUserProfile(body: UpdateUserProfileRequest) {
    const res = await api.patch<UserProfile>("/v1/profile", body);
    return res.data;
}
