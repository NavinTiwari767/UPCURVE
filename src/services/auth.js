import { supabase } from './supabase';

// ✅ LOGIN (UPDATED)
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data };
};

// ✅ GET SESSION
export const getSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session;
};

// ✅ LOGOUT
export const signOut = async () => {
  await supabase.auth.signOut();
};
