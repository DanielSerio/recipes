export interface RecipeIngredientCreateParams {
  recipe_id: string;
  ingredient_id: string;
  uom_id: string;
  uom_quantity: number;
}
export interface RecipeIngredientDeleteParams {
  recipe_id: string;
  ingredient_id: string;
}
export interface RecipeIngredientRecord {
  recipe_id: string;
  ingredient_id: string;
  uom_id: string;
  uom_quantity: number;
}
export interface RecipeIngredientReducedRecord {
  recipe_id: string;
  ingredient_id: string;
  uom_id: string;
  uom_quantity: number;
}
export interface RecipeIngredientUpdateParams {
  recipe_id: string;
  ingredient_id: string;
  uom_id?: string;
  uom_quantity?: number;
}