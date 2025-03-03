import { createServerSupabaseClient } from "@emenu/auth";
import { cookies } from "next/headers";

export const createClient = async () => {
  return createServerSupabaseClient({ cookies });
};
