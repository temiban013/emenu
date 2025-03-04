// packages/auth/src/context/AuthContext.tsx
import * as React from "react";
import { createClientSupabaseClient } from "../components/client";
import type { AuthContextType, UserRole, AuthState } from "../components/types";
import { Session, User } from "@supabase/supabase-js";

export const AuthContext = React.createContext<AuthContextType | null>(null);

// Add React import at the top if not already present
const { useState, useEffect } = React;

interface AuthProviderProps {
  children: React.ReactNode;
  initialSession?: Session | null;
}

export const AuthProvider = ({
  children,
  initialSession,
}: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: initialSession || null,
    isLoading: true,
    userRole: null,
  });

  const supabase = createClientSupabaseClient();

  useEffect(() => {
    // Set initial state if initialSession is provided
    if (initialSession) {
      setAuthState({
        session: initialSession,
        user: initialSession.user,
        isLoading: false,
        userRole: null, // We'll fetch this separately
      });
      fetchUserRole(initialSession.user.id);
    }

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setAuthState((state) => ({
        ...state,
        session,
        user: session?.user ?? null,
        isLoading: false,
      }));

      if (session?.user) {
        fetchUserRole(session.user.id);
      } else {
        setAuthState((state) => ({ ...state, userRole: null }));
      }
    });

    // Initial session check if not provided
    if (!initialSession) {
      checkSession();
    }

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkSession = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setAuthState({
        session,
        user: session?.user ?? null,
        isLoading: false,
        userRole: null, // We'll fetch this separately
      });

      if (session?.user) {
        fetchUserRole(session.user.id);
      }
    } catch (error) {
      console.error("Error checking auth session:", error);
      setAuthState((state) => ({ ...state, isLoading: false }));
    }
  };

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .single();

      if (error) {
        console.error("Error fetching user role:", error);
        return;
      }

      setAuthState((state) => ({ ...state, userRole: data.role as UserRole }));
    } catch (error) {
      console.error("Error getting user role:", error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const { error, data } = await supabase.auth.signUp({ email, password });
      const needsEmailVerification = !data.session;
      return { error, needsEmailVerification };
    } catch (error) {
      return { error: error as Error, needsEmailVerification: false };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const updatePassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({ password });
      return { error };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const value = {
    ...authState,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
