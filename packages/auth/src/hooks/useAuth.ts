// packages/auth/src/hooks/useAuth.ts
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import type { AuthContextType } from "../components/types";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
