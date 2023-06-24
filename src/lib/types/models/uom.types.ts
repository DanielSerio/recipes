export interface UomCreateParams {
  uom_name: string;
  uom_abbv: string;
}
export interface UomDeleteParams {
  uom_id: string;
}
export interface UomRecord {
  uom_id: string;
  uom_name: string;
  uom_abbv: string;
}
export interface UomReducedRecord {
  uom_id: string;
  uom_name: string;
  uom_abbv: string;
}
export interface UomUpdateParams {
  uom_id: string;
  uom_name?: string;
  uom_abbv?: string;
}