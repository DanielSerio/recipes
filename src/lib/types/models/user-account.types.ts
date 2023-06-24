export interface UserAccountCreateParams {
  user_account_id?: string;
  email: string;
  account_pass: string;
  first_name?: string | null;
  last_name?: string | null;
  profile_img_url?: string;
}
export interface UserAccountDeleteParams {
  user_account_id: string;
}
export interface UserAccountLoginParams {
  email: string;
  account_pass: string;
}
export interface UserAccountRecord {
  user_account_id: string;
  created_at: string | Date;
  updated_at: string | Date | null;
  email: string;
  first_name: string | null;
  last_name: string | null;
  profile_img_url: string;
  account_confirmed: 0 | 1;
}
export interface UserAccountReducedRecord {
  user_account_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  profile_img_url: string;
}
export interface UserAccountUpdateParams {
  user_account_id: string;
  first_name?: string;
  last_name?: string;
  profile_img_url?: string;
  account_confirmed?: 0 | 1;
}