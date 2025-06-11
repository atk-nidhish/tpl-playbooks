
export const cleanupAuthState = () => {
  console.log('Cleaning up authentication state...');
  
  // Remove standard auth tokens
  localStorage.removeItem('supabase.auth.token');
  
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      console.log(`Removing localStorage key: ${key}`);
      localStorage.removeItem(key);
    }
  });
  
  // Remove from sessionStorage if in use
  if (typeof sessionStorage !== 'undefined') {
    Object.keys(sessionStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        console.log(`Removing sessionStorage key: ${key}`);
        sessionStorage.removeItem(key);
      }
    });
  }
  
  console.log('Authentication state cleanup completed');
};

export const performGlobalSignOut = async (supabase: any) => {
  try {
    console.log('Attempting global sign out...');
    await supabase.auth.signOut({ scope: 'global' });
    console.log('Global sign out completed');
  } catch (error) {
    console.log('Global sign out failed, continuing anyway:', error);
    // Continue even if this fails
  }
};
