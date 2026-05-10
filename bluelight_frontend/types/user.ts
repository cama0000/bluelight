export interface User {
  firebaseUid: string;
  email: string | null;
  username: string | null;
  bio: string;
  profilePicUrl: string;
  token: string;
  role: Role;
  points: number;
}

export interface UpdateProfileRequest {
  username: string;
  bio: string;
  profilePicUrl: string;
}

export enum Role {
  User,
  Admin,
}
