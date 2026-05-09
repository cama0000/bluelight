export interface User {
  firebaseUid: string;
  email: string | null;
  username: string | null;
  bio: string;
  token: string;
  role: Role;
  points: number;
}

export enum Role {
  User,
  Admin,
}
