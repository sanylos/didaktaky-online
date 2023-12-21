import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/supabase'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    id: null,
    email: null,
    isLoggedIn: false,
    exerciseFilters: {
      examType: 'PZ',
      examYears: ['2023'],
      examVariants: ['1'],
      examSubjects: ['CJL'],
    },
  }),

  actions: {
    resetUserData() {
      this.isLoggedIn = false;
      this.id = null;
      this.email = null;
    },
    async initialize() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        this.email = user.email;
        this.isLoggedIn = true;
        this.id = user.id;
      } else {
        this.resetUserData();
      }
    },
    async signOut() {
      const { error } = await supabase.auth.signOut();
      this.resetUserData();
      if (error) alert(error);
    }
  },
})