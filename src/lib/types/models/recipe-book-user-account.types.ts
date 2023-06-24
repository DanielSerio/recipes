export interface RecipeBookUserAccountCreateParams {
  recipe_book_id: string;
  user_account_id: string;
  member_status?: 0 | 1;
}
export interface RecipeBookUserAccountDeleteParams {
  recipe_book_id: string;
  user_account_id: string;
}
export interface RecipeBookUserAccountRecord {
  recipe_book_id: string;
  user_account_id: string;
  member_status: 0 | 1;
}
export interface RecipeBookUserAccountReducedRecord {
  recipe_book_id: string;
  user_account_id: string;
  member_status: 0 | 1;
}
export interface RecipeBookUserAccountUpdateParams {
  recipe_book_id: string;
  user_account_id: string;
  member_status?: 0 | 1;
}