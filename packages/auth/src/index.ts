// packages/auth/src/index.ts
import type { SupabaseClient } from "@supabase/supabase-js";
// Import components from UI
import { LoginForm, RegisterForm } from "@emenu/ui";

// Export them if needed along with auth functionality
export { LoginForm, RegisterForm };
export { AuthProvider } from "./context/AuthContext";
export { useAuth } from "./hooks/useAuth";

// Export server and client functions
export { getUserRole, requireAuth } from "./components/server";
export { createClientSupabaseClient } from "./components/client";

export type {
  AuthContextType,
  UserRole,
  AuthState,
  SupabaseAuthHelpers,
  Session,
  User,
} from "./components/types";

// Helper functions
export const getUser = async (supabase: SupabaseClient) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

export const getSession = async (supabase: SupabaseClient) => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
};
