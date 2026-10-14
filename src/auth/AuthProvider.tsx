import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

import { supabase } from "../services/supabase";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function loadUser(user: User | null) {
      setUser(user);

      if (!user) {
        setIsAdmin(false);
        return;
      }

      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Failed to load user role:", error);
        setIsAdmin(false);
        return;
      }

      setIsAdmin(data.role === "admin");
    }

    async function loadSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      await loadUser(session?.user ?? null);

      setIsLoading(false);
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      loadUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
