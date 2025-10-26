export interface User{
    firebaseUid: string;
    email: string | null;
    username: string | null;
    bio?: string;
    token: string;
}