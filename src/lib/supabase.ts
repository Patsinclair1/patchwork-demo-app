import { createClient } from "@supabase/supabase-js";

// Wrong: service_role exposed via NEXT_PUBLIC_ prefix
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);
