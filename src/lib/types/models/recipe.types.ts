export interface RecipeCreateParams {
  recipe_title: string;
  recipe_desc?: string | null;
  cover_img_url?: string | null;
  thumbnail_img_url?: string | null;
  slug_url: string;
}
export interface RecipeDeleteParams {
  recipe_id: string;
}
export interface RecipeRecord {
  recipe_id: string;
  created_at: string | Date;
  updated_at: string | Date | null;
  created_by_user: string;
  recipe_title: string;
  recipe_desc: string | null;
  cover_img_url: string | null;
  thumbnail_img_url: string | null;
  slug_url: string;
}
export interface RecipeReducedRecord {
  recipe_id: string;
  recipe_title: string;
  recipe_desc: string | null;
  cover_img_url: string | null;
  thumbnail_img_url: string | null;
  slug_url: string;
}
export interface RecipeUpdateParams {
  recipe_id: string;
  recipe_title?: string;
  recipe_desc?: string | null;
  cover_img_url?: string | null;
  thumbnail_img_url?: string | null;
}