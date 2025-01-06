export type User = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  avatarUrl?: string;
  role: UserRole;
};

export enum UserRole {
  ADMIN = "Admin",
  USER = "User",
}
