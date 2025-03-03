import type { Database } from "@emenu/database";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";

export const createServerSupabaseClient = <
  T extends Database = Database,
>(context: {
  cookies: () => any;
}) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createServerClient<T>(supabaseUrl, supabaseKey, {
    cookies: {
      get: (name: string) => context.cookies().get(name)?.value,
      set: (name: string, value: string, options: any) =>
        context.cookies().set(name, value, options),
      remove: (name: string, options: any) =>
        context.cookies().set(name, "", { ...options, maxAge: 0 }),
    },
  });
};
