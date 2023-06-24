export interface ExpiredTokenCreateParams {
  token_value: string;
}
export interface ExpiredTokenRecord {
  stored_at: string | Date;
  token_value: string;
}
export interface ExpiredTokenReducedRecord {
  token_value: string;
}