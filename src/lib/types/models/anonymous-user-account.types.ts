export interface AnonymousUserAccountCreateParams {
  associated_with_account: 0 | 1;
}
export interface AnonymousUserAccountDeleteParams {
  anonymous_user_account_id: string;
}
export interface AnonymousUserAccountRecord {
  anonymous_user_account_id: string;
  created_at: string | Date;
  associated_with_account: 0 | 1;
}
export interface AnonymousUserAccountReducedRecord {
  anonymous_user_account_id: string;
}
export interface AnonymousUserAccountUpdateParams {
  anonymous_user_account_id: string;
  associated_with_account?: 0 | 1;
}