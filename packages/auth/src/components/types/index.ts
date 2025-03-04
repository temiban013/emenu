// packages/auth/src/types/index.ts
import type { Session, User as SupabaseUser } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

export type { Session };
export type User = SupabaseUser;

export enum UserRole {
  ADMIN = "admin",
  STAFF = "staff",
  CUSTOMER = "customer",
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  userRole: UserRole | null;
}

export interface AuthContextType extends AuthState, SupabaseAuthHelpers {}

export interface SupabaseAuthHelpers {
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (
    email: string,
    password: string
  ) => Promise<{
    error: Error | null;
    needsEmailVerification: boolean;
  }>;
  signOut: () => Promise<{ error: Error | null }>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  updatePassword: (password: string) => Promise<{ error: Error | null }>;
}
