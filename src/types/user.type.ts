export enum UserStatus {
  ACTIVE = "ACTIVE",
  BLOCKED = "BLOCKED",
}

export interface IUser {
  id: string;
  fullname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  status: UserStatus;
  image: string;
  isAdmin: boolean;
}
