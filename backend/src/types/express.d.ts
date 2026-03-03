import { User } from "../your-user-type-file"; // adjust path

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        userName: string;
        email: string;
        isVerified: boolean;
        createdAt?: Date | null;
        passwordChangedAt?: Date | null;
      };
    }
  }
}

export {};
