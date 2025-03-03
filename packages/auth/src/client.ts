import type { Database } from "@emenu/database";
import { createBrowserClient } from "@supabase/ssr";

export const createClientSupabaseClient = <T extends Database = Database>() => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createBrowserClient<T>(supabaseUrl, supabaseKey);
};
