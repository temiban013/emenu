import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@emenu/database";

export async function createClient() {
  return createServerComponentClient<Database>({ cookies });
}
