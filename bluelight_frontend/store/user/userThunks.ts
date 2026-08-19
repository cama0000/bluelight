import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "@/firebase";
import { userApi } from "@/api/userApi";
import { Role, User } from "@/types/user";
import { toast } from "sonner";
import { setLoading } from "../loading/loadingSlice";

export const authLogin = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>(
  "user/authLogin",
  async (_, { dispatch, rejectWithValue }) => {
    try{
        dispatch(setLoading({isLoading: true}));
        const result = await signInWithPopup(auth, googleProvider);
        const firebaseUser = result.user;
        const token = await firebaseUser.getIdToken();

        const userRequest: User = {
            firebaseUid: firebaseUser.uid,
            email: firebaseUser.email,
            username: firebaseUser.displayName,
            bio: "",
            profilePicUrl: "/images/default-user.png",
            token,
            role: Role.User,
            points: 0
        };

        const notificationMessage = `Logged in as '${userRequest.username}'`;

        const user = await userApi.login(
            userRequest,
            notificationMessage,
            token
        );

        return {
            ...user,
            token
        };
    } 
    catch(error){
        toast.error("Google sign-in failed.");
        await signOut(auth);
        return rejectWithValue("Google sign-in failed.");
    }
    finally{
        dispatch(setLoading({isLoading: false}));
    }
  }
);


export const authLogout = createAsyncThunk<
    void,
    void,
    { rejectValue: string }
>(
    "user/authLogout",
    async (_, { dispatch, rejectWithValue }) => {
        try{
            dispatch(setLoading({isLoading: true}));
            await signOut(auth);
            toast.success("Logged out successfully!");
        }
        catch(error){
            toast.error("Log out unsuccessful.");
            return rejectWithValue("Log out unsuccessful.");
        }
        finally{
            dispatch(setLoading({isLoading: false}));
        }
    }
);