import axios from "axios";
import { supabase } from "../supabase/client";

// Create an axios instance using api URL as the base for all requests
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Intercept all api requests to include supabase access token (if exists)
api.interceptors.request.use(async (config) => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    if (token) {
        config.headers = config.headers ?? {}; // ensure config.headers exists as an object
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export * from "./organisations";
