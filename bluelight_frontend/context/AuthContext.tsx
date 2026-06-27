"use client";

import { userApi } from "@/api/userApi";
import { auth, googleProvider } from "@/firebase";
import { User, Role } from "@/types/user";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner"

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authLogin: () => Promise<void>;
  authLogout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  authLogin: async () => {},
  authLogout: async () => {},
  setUser: () => {}
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function authLogin() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      const token = await firebaseUser.getIdToken();

      // default user body, used on first login
      const userRequest: User = {
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email,   
        username: firebaseUser.displayName,
        bio: "",
        profilePicUrl: "/images/default-user.png",
        token: token,
        role: Role.User,
        points: 0,
      };

      const notificationMessage = "Logged in as '" + userRequest.username + "'";

      const user: User = await userApi.login(userRequest, token, notificationMessage);

      user.token = token;
      setUser(user);
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Google sign-in error:" + error);
      throw error;
    }
  }

  async function authLogout() {
    setLoading(true);
    await signOut(auth);
    setUser(null);
    setLoading(false);
    toast.success("Logged out successfully!")
  }

  // this runs on refresh and new pages checking the auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser: FirebaseUser | null) => {

        // retrieve already logged in user
        if (firebaseUser) {
          const token = await firebaseUser.getIdToken();

          // set token manually since backend should not store token (not stable data)
          const user: User = await userApi.read(token);
          user.token = token;

          setUser(user);
        } else {
          setUser(null);
        }

        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authLogin,
        authLogout,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
