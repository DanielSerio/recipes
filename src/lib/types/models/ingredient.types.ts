export interface IngredientCreateParams {
  ingredient_name: string;
  thumbnail_img_url: string;
}
export interface IngredientDeleteParams {
  ingredient_id: string;
}
export interface IngredientRecord {
  ingredient_id: string;
  created_at: string | Date;
  updated_at: string | Date | null;
  created_by_user: string;
  ingredient_name: string;
  thumbnail_img_url: string;
}
export interface IngredientReducedRecord {
  ingredient_id: string;
  ingredient_name: string;
  thumbnail_img_url: string;
}
export interface IngredientUpdateParams {
  ingredient_id: string;
  ingredient_name?: string;
  thumbnail_img_url?: string;
}