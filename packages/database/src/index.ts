import { createClient } from "@supabase/supabase-js";
import type { Database } from "./schema";

export type { Database };

const createDatabaseClient = (supabaseUrl: string, supabaseKey: string) => {
  return createClient<Database>(supabaseUrl, supabaseKey);
};

export { createDatabaseClient };
