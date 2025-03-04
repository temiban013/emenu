// packages/auth/src/server.ts
import { type User } from "@supabase/supabase-js";
import { UserRole } from "./types";
import { redirect } from "next/navigation";

export const getUserRole = (user: User | null): UserRole => {
  if (!user) return UserRole.CUSTOMER;
  return (user.user_metadata?.role as UserRole) || UserRole.CUSTOMER;
};

export const requireAuth = (
  user: User | null,
  redirectTo: string = "/sign-in"
) => {
  if (!user) {
    redirect(redirectTo);
  }
  return user;
};
