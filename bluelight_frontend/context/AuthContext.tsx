'use client'

import { auth, googleProvider } from "@/firebase";
import { login } from "@/services/user";
import { User } from "@/types/user";
import { onAuthStateChanged, signInWithPopup, signOut, User as FirebaseUser } from "firebase/auth";
import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

interface AuthContextType{
    user: User | null,
    loading: boolean
    authLogin: () => Promise<void>,
    authLogout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    authLogin: async () => {},
    authLogout: async () => {},
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);


    async function authLogin() {
        try {
          const result = await signInWithPopup(auth, googleProvider);
          const firebaseUser = result.user;
          const token = await firebaseUser.getIdToken();
          console.log("Firebase ID token:", token);

          const userBody : User = {
            firebaseUid: firebaseUser.uid,
            email: firebaseUser.email,
            username: firebaseUser.displayName,
            bio: ""
          }

          await login(userBody, token);

          userBody.token = token;
          setUser(userBody);
        } catch (error) {
          console.error("Google sign-in error:", error);
        }
    }

    async function authLogout() {
        await signOut(auth);
        setUser(null);
    }



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser : FirebaseUser | null) => {
            if(firebaseUser){
                const token = await firebaseUser.getIdToken();

                const userBody : User = {
                    firebaseUid: firebaseUser.uid,
                    email: firebaseUser.email,
                    username: firebaseUser.displayName,
                    bio: "",
                    token: token
                }

                setUser(userBody);


            }
            else{
                setUser(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                authLogin,
                authLogout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
