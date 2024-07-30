import { Admin, AdminRole } from "@/generated/graphql";

// __typename?: 'Admin';
//   _id: Scalars['ID']['output'];
//   accessHistory: Array<AccessHistory>;
//   blockedBy: Admin;
//   createdAt: Scalars['DateTimeISO']['output'];
//   createdBy: Admin;
//   email: Scalars['String']['output'];
//   lastLoggedIn?: Maybe<Scalars['DateTimeISO']['output']>;
//   lastLoggedOut?: Maybe<Scalars['DateTimeISO']['output']>;
//   name: Scalars['String']['output'];
//   numberOfResetPassword: Scalars['Float']['output'];
//   role: AdminRole;
//   status: PlatformStatus;
//   unBlockedBy: Admin;
//   updatedAt: Scalars['DateTimeISO']['output'];
//   updatedBy: Admin;

type AdminRow = Omit<
  Admin,
  | "_id"
  | "__typename"
  | "accessHistory"
  | "createdBy"
  | "updatedBy"
  | "blockedBy"
  | "unBlockedBy"
>;

export type AdminRowType = {
  id: string;
} & AdminRow;

export interface AddAdminFormInputs {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: RoleOption | null;
}

export interface RoleOption {
  value: AdminRole;
  label: string;
}

export const roleOptions: RoleOption[] = [
  { value: AdminRole.Admin, label: "Admin" },
  { value: AdminRole.Instructor, label: "Instructor" }
];

export interface ChangePasswordInputs {
  newPassword: string;
}

export interface ChangeRoleInputs {
  role: RoleOption | null;
}
