/**
 * API Return Type (Origin)
 */
export interface FetchResult<T> {
	verify: boolean;
	message: string;
	result: T;
}

/**
 * API Return Type (Extended)
 * - Add HTTP Status Code
 */
export interface FetchResultExtended<T> extends FetchResult<T> {
	statusCode: number
};

/**
 * Restful HTTP Method Type
 */
export type HttpMethod = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * Query Parameter Type
 */
export type QueryParams = string 
	| URLSearchParams 
	| string[][] 
	| Record<string, string> 
	| undefined;