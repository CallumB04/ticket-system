import { createClient } from "@supabase/supabase-js";

// Create a supabase client from environment variables
export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);
