export interface RecipeStepItemCreateParams {
  recipe_id: string;
  step_item_id: string;
  step_item_order: number;
}
export interface RecipeStepItemDeleteParams {
  recipe_id: string;
  step_item_id: string;
}
export interface RecipeStepItemRecord {
  recipe_id: string;
  step_item_id: string;
  step_item_order: number;
}
export interface RecipeStepItemReducedRecord {
  recipe_id: string;
  step_item_id: string;
  step_item_order: number;
}
export interface RecipeStepItemUpdateParams {
  recipe_id: string;
  step_item_id: string;
  step_item_order?: number;
}