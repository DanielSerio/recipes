export interface StepItemCreateParams {
  step_text: string;
  step_img_url: string | null;
}
export interface StepItemDeleteParams {
  step_item_id: string;
}
export interface StepItemRecord {
  step_item_id: string;
  step_text: string;
  step_img_url: string | null;
}
export interface StepItemReducedRecord {
  step_item_id: string;
  step_text: string;
  step_img_url: string | null;
}
export interface StepItemUpdateParams {
  step_item_id: string;
  step_text?: string;
  step_img_url?: string | null;
}