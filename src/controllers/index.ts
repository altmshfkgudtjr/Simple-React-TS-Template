/**
 * Fetch API Return Class
 * @class
 */
export class FetchResponse<T> {
	statusCode: number;
	response: Promise<T>;
	/**
	 * @param {number} statusCode HTTP Code
	 * @param {Promise<T>} response fetch API Return Value
	 */
	constructor(statusCode: number, response: Promise<T>) {
		this.statusCode = statusCode;
		this.response = response;
	}
}