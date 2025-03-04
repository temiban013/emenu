// packages/auth/src/client.ts
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@emenu/database";

export const createClientSupabaseClient = <T extends Database = Database>() => {
  return createClientComponentClient<T>();
};
