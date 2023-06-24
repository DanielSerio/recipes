export interface RecipeBookCreateParams {
  book_name: string;
  book_desc?: string | null;
  thumbnail_img_url?: string;
  cover_img_url?: string;
  slug_url: string;
}
export interface RecipeBookDeleteParams {
  recipe_book_id: string;
}
export interface RecipeBookRecord {
  recipe_book_id: string;
  created_at: string | Date;
  updated_at: string | Date | null;
  created_by_user: string;
  book_name: string;
  book_desc: string | null;
  thumbnail_img_url: string;
  cover_img_url: string;
  slug_url: string;
}
export interface RecipeBookReducedRecord {
  recipe_book_id: string;
  book_name: string;
  thumbnail_img_url: string;
  slug_url: string;
}
export interface RecipeBookUpdateParams {
  recipe_book_id: string;
  book_name?: string;
  book_desc?: string | null;
  thumbnail_img_url?: string;
  cover_img_url?: string;
}