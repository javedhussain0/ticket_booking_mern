import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: {
        name: "xxx",
        profilePic: "https://i.pravatar.cc/150?img=12",
      },
      isLoggedIn: true,
      
      updateProfile: (newProfile) => set((state) => ({
        user: { ...state.user, ...newProfile }
      })),
      
      // Login function
      login: (userData) => set({ 
        isLoggedIn: true,
        user: { ...get().user, ...userData }
      }),
      
      // Logout function
      logout: () => set({ 
        isLoggedIn: false,
        user: { name: "xxx", profilePic: "https://i.pravatar.cc/150?img=12" }
      }),
    }),
    {
      name: 'user-storage', // Name for localStorage
    }
  )
);