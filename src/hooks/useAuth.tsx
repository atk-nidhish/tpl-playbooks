
import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { cleanupAuthState, performGlobalSignOut } from "@/utils/authUtils";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Setting up auth state listener...');
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Defer any additional data fetching to prevent deadlocks
        if (event === 'SIGNED_IN' && session?.user) {
          setTimeout(() => {
            console.log('User signed in successfully:', session.user.email);
          }, 0);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      console.log('Initial session check:', session?.user?.email, error);
      if (error) {
        console.error('Error getting initial session:', error);
        cleanupAuthState();
      }
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      console.log('Cleaning up auth subscription...');
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    console.log('Starting sign out process...');
    try {
      // Clean up auth state first
      cleanupAuthState();
      
      // Attempt global sign out
      await performGlobalSignOut(supabase);
      
      // Force page reload for a clean state
      window.location.href = '/';
    } catch (error) {
      console.error("Error signing out:", error);
      // Force reload anyway
      window.location.href = '/';
    }
  };

  return {
    user,
    session,
    loading,
    signOut,
  };
};
