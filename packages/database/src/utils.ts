// packages/database/src/utils.ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./schema";

export function createServerClient(supabaseUrl: string, supabaseKey: string) {
  return createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
