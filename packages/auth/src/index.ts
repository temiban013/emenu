import type { SupabaseClient } from "@supabase/supabase-js";

export type { Session, User } from "@supabase/supabase-js";

// Export server and client functions
export { createServerSupabaseClient } from "./server";
export { createClientSupabaseClient } from "./client";

export const getUser = async (supabase: SupabaseClient) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};
