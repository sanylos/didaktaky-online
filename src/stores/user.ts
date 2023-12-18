import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/supabase'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    id: null,
    email: null,
    isLoggedIn: false,
    exerciseFilters: {}, //Empty object
  }),

  actions: {
    async initialize() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        this.email = user.email;
        this.isLoggedIn = true;
        this.id = user.id;
      } else {
        this.isLoggedIn = false;
      }
    },
    async signOut() {
      const { error } = await supabase.auth.signOut();
      this.isLoggedIn = false;
      if (error) alert(error);
    }
  },
})