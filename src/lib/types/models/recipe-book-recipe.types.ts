export interface RecipeBookRecipeCreateParams {
  recipe_book_id: string;
  recipe_id: string;
  publish_at?: string | null;
}
export interface RecipeBookRecipeDeleteParams {
  recipe_book_id: string;
  recipe_id: string;
}
export interface RecipeBookRecipeRecord {
  recipe_book_id: string;
  recipe_id: string;
  publish_at: string | null;
}
export interface RecipeBookRecipeReducedRecord {
  recipe_book_id: string;
  recipe_id: string;
  publish_at: string | null;
}
export interface RecipeBookRecipeUpdateParams {
  recipe_book_id: string;
  recipe_id: string;
  publish_at?: string | null;
}