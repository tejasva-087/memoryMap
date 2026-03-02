import { Request } from "express";

export interface AuthenticatedUser {
  id: string;
  userName: string;
  email: string;
  isVerified: boolean;
  createdAt: Date | null;
  passwordChangedAt: Date | null;
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}
