import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  initAuth: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,

  initAuth: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        set({ user: userData, loading: false });
      } else {
        set({ user: null, loading: false });
      }
    } catch (error) {
      set({ error: 'Authentication failed', loading: false });
    }
  },

  signIn: async (email, password) => {
    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (user) {
        const { data: userData, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;
        set({ user: userData, error: null });
      }
    } catch (error) {
      throw error;
    }
  },

  signUp: async (email, password, name) => {
    try {
      const { data: { user }, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) throw error;

      if (user) {
        const { data: userData, error: profileError } = await supabase
          .from('users')
          .insert({
            id: user.id,
            email: user.email,
            full_name: name,
            points: 0,
          })
          .select()
          .single();

        if (profileError) throw profileError;
        set({ user: userData, error: null });
      }
    } catch (error) {
      throw error;
    }
  },

  signOut: async () => {
    try {
      await supabase.auth.signOut();
      set({ user: null, error: null });
    } catch (error) {
      throw error;
    }
  },
}));