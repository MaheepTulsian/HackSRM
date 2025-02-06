import { create } from "zustand";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged, 
  signOut,
  sendPasswordResetEmail 
} from "firebase/auth";
import { auth } from "../lib/firebase";

const useAuthStore = create((set) => {
  // Listen for auth state changes
  onAuthStateChanged(auth, (user) => {
    set({ user: user || null });
  });

  return {
    user: null,
    loading: false,
    error: null,

    // Register new user
    register: async (email, password) => {
      set({ loading: true, error: null });
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        set({ user: userCredential.user });
        return userCredential.user;
      } catch (err) {
        set({ error: err.message });
        throw err;
      } finally {
        set({ loading: false });
      }
    },

    // Login existing user
    login: async (email, password) => {
      set({ loading: true, error: null });
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        set({ user: userCredential.user });
        return userCredential.user;
      } catch (err) {
        set({ error: err.message });
        throw err;
      } finally {
        set({ loading: false });
      }
    },

    // Logout user
    logout: async () => {
      set({ loading: true, error: null });
      try {
        await signOut(auth);
        set({ user: null });
      } catch (err) {
        set({ error: err.message });
        throw err;
      } finally {
        set({ loading: false });
      }
    },
    
    // Forgot password
    forgotPassword: async (email) => {
      set({ loading: true, error: null });
      try {
        await sendPasswordResetEmail(auth, email);
        return "Password reset email sent. Please check your inbox.";
      } catch (err) {
        set({ error: err.message });
        throw err;
      } finally {
        set({ loading: false });
      }
    },
  };
});

export default useAuthStore;
