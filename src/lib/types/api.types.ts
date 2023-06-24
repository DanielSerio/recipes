export type SortingDirection = 'ASC' | 'DESC';

export interface Sorting {
	[column_name: string]: SortingDirection;
}

export type ColumnFilterOperator = 'eq' | 'not' | 'ct' | 'sw' | 'ew' | 'gt' | 'gte' | 'lt' | 'lte';
export type ColumnFilterGroup = 'and' | 'or';

export interface ColumnFilter {
	[k: string]: string | ColumnFilterGroup | ColumnFilterOperator;
	group: ColumnFilterGroup;
	operator: ColumnFilterOperator;
	value: string;
}

export interface Filtering {
	[column_name: string]: ColumnFilter[];
}

interface APIResponseBase {
	status: number;
}

export type APIErrorType = APIResponseBase & Error & { cause: string };
interface SimpleAPIResponseBase extends APIResponseBase {
	status: 200;
}

export type SimpleResponse<AdditionalProps extends object = any> = SimpleAPIResponseBase &
	AdditionalProps;

export interface SingleRecordFound<RecordType extends object> extends SimpleResponse {
	record: RecordType;
}

export interface SingleRecordNotFound extends APIResponseBase {
	record: null;
	status: 404;
}

export type SingleRecord<RecordType extends object> =
	| SingleRecordFound<RecordType>
	| SingleRecordNotFound;

export interface PagingParams {
	[k: string]: number;
	limit: number;
	offset: number;
}

export interface PagingTotals {
	[k: string]: number;
	records: number;
	pages: number;
}

export interface PagingResponse {
	limit: number;
	offset: number;
	totals: PagingTotals;
}

export interface GetMany<RecordType extends object> extends APIResponseBase {
	records: RecordType[];
	paging: PagingResponse;
	filtering?: Filtering;
	sorting?: Sorting;
}
