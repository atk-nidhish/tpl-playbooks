
import { supabase } from "@/integrations/supabase/client";

export const cleanupAuthState = () => {
  console.log('Cleaning up auth state...');
  
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      console.log('Removing localStorage key:', key);
      localStorage.removeItem(key);
    }
  });
  
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      console.log('Removing sessionStorage key:', key);
      sessionStorage.removeItem(key);
    }
  });
};

export const testSupabaseConnection = async () => {
  try {
    console.log('Testing Supabase connection...');
    console.log('Supabase URL:', 'https://iryousvyjqlbeyjsswxj.supabase.co');
    
    // Use Supabase client to test connectivity - this avoids CORS issues
    const { error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
    
    // If there's no error or it's just a table-not-found error, connection is working
    const isConnected = !error || error.code === 'PGRST116'; // Table not found is OK for connection test
    
    console.log('Connection test result:', isConnected ? 'SUCCESS' : 'FAILED');
    if (error && error.code !== 'PGRST116') {
      console.log('Connection test error:', error);
    }
    
    return isConnected;
  } catch (error) {
    console.error('Connection test failed:', error);
    return false;
  }
};

export const forceSignOut = async () => {
  try {
    console.log('Force signing out user...');
    
    // Clean up auth state first
    cleanupAuthState();
    
    // Attempt global sign out
    const { error } = await supabase.auth.signOut({ scope: 'global' });
    if (error) {
      console.error('Sign out error:', error);
    }
    
    // Force a complete page reload to ensure clean state
    window.location.reload();
  } catch (error) {
    console.error('Error during force sign out:', error);
    // Force reload anyway
    window.location.reload();
  }
};
