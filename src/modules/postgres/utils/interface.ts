import { GenderEnum } from "../../../common/enums/general.enum";

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

export interface IPagination {
  limit: number;
  page: number;
  filter?: IFilter;
}

export interface IFilter {
  where?: { field: string; operator: string; value: string }[];
  group?: string[];
  order?: string[];
  is_asc?: boolean;
  limit?: number;
  page?: number;
}

export interface IUserGetOne {
  id: string;
  user_name: string;
  email: string;
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

export interface IUserUpdate {
  id: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: GenderEnum;
}

export interface IUserRemove {
  id: string;
}

export interface IUserRestore {
  id: string;
}
