export interface User {
  userId: string;
  name: string;
  role: UserRole;
  email: string;
  password: string;
  username?: string;
  firstName?: string;
  lastName?: string;
}
export enum UserRole {
  END_USER = 1,
  SUPPORT_ENGINEER = 2,
  SUPERVISOR = 3
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    tokenType: string;
  };
  user:User;
}