'use client'

import { userApi } from "@/api/userApi";
import { auth } from "@/firebase";
import {onAuthStateChanged} from "firebase/auth";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/store";
import { clearUser, setUser } from "@/store/user/userSlice";
import useSetLoading from "@/app/hooks/loading/useSetLoading";
import { setLoading } from "@/store/loading/loadingSlice";

export default function AuthInitializer() {
  const dispatch = useAppDispatch();

  // this runs on refresh and new pages checking the auth state
  useEffect(() => {
    dispatch(setLoading({ isLoading: true }));
    
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try{
        if (firebaseUser) {
          const token = await firebaseUser.getIdToken();
  
          // set token manually since backend should not store token (not stable data)
          const user = await userApi.read(token);
          user.token = token;
  
          dispatch(setUser(user));
        } else {
          dispatch(clearUser());
        }
      }
      catch (error) {
        console.error("Failed to initialize auth:", error);
        dispatch(clearUser());
      }
      finally{
        dispatch(setLoading({ isLoading: false }));
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return null;
}