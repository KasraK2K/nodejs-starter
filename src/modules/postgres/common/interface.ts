import { GenderEnum } from "./enum";

export interface IUserList {
  rowCount: number;
  rows: IUser[];
}

export interface IUser {
  id: number;
  user_name: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: GenderEnum;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  is_active: boolean;
  is_verified: boolean;
  is_admin: boolean;
  is_super_admin: boolean;
  is_blocked: boolean;
}

export interface IUserCreate {
  user_name: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: GenderEnum;
}

export interface IPagination {
  limit: number;
  page: number;
  filter?: {
    where?: { field: string; operator: string; value: string }[];
    group?: string[];
    order?: { field: string; value: string }[];
    is_asc?: boolean;
  };
}
