
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
    
    // Try a simple request to test connectivity
    const response = await fetch('https://iryousvyjqlbeyjsswxj.supabase.co/rest/v1/', {
      method: 'GET',
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlyeW91c3Z5anFsYmV5anNzd3hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNjA3MzQsImV4cCI6MjA2MzgzNjczNH0.PyvWJ13ELlIAZtMrQLy_Ifn0jQ6i43lsfHt3zIoQxRU',
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Connection test response status:', response.status);
    console.log('Connection test response ok:', response.ok);
    
    return response.ok;
  } catch (error) {
    console.error('Connection test failed:', error);
    return false;
  }
};
