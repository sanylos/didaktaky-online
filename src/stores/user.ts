// @ts-nocheck
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
      examType: [""],
      examYears: [""],
      examVariants: [""],
      examSubjects: [""],
    },
    exerciseAnswer: [],
  }),

  actions: {
    resetUserFilters() {
      this.exerciseFilters.examType = ["PZ"];
      this.exerciseFilters.examYears = ["2020","2021","2022","2023"];
      this.exerciseFilters.examVariants = ["1","2","3","4","5","6"];
      this.exerciseFilters.examSubjects = ["CJL","MAT","ANJ"];
    },
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