import * as apiType from 'types/controllers'
import { FetchResponse } from 'controllers'

/**
 * HTTP Reqeust Module
 * @function
 * 
 * @param {string} url URL
 * @param {'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'} method HTTP Method
 * @param {object | FormData} sendData Body data
 * @param {function (res): void} callback Callback when success [Optional]
 * @param {function (err): void} failed Callback when failed [Optional]
 * 
 * @returns {Promise}
 * 
 * @example <caption>When using the GET method</caption>
 * Fetch('/api/v1/test/get', 'GET')
 * .then(res => {  });
 * 
 * @example <caption>When using the POST method</caption>
 * Fetch('api/v1/test/post', 'POST', {key: 'value'})
 * .then(res => {  });
 * 
 * @example <caption>when sending the FormData</caption>
 * const sendData = new FormData();
 * sendData.append('key', 'value');
 * Fetch('api/v1/test/post', 'POST', sendData)
 * .then(res => {  });
 */
const Fetch = <T = any, U = object | FormData>(
	url: string,
	method: apiType.HttpMethod,
	sendData?: U,
	callback?: (res: apiType.FetchResultExtended<T>) => void,
	failed?: (res: apiType.FetchResultExtended<T>) => void
): Promise<apiType.FetchResultExtended<T>> => {
	/**
	 * FormData Check
	 * @param data object or FormData
	 */
	const checkFormData = (data: any): boolean => data.constructor.toString().slice(9).startsWith('FormData');
	
	/** init request form */
	const isFormData = !!sendData && checkFormData(sendData) ? true : false;
	
	const headers = {};

	const request: object = {};
	if (method === 'GET') {
		Object.assign(request, {
			method,
			headers
		});
	} else {
		Object.assign(request, {
			method,
			headers: isFormData
				? headers
				: Object.assign(headers, {
					"Content-Type": "application/json",
					"Accept": "application/json"
				}),
			body: isFormData
				? sendData
				: JSON.stringify(sendData)
		});
	}

	return fetch(url, request)
		.then(res => {
			const statusCode = res.status;

			switch (Math.floor(res.status / 100)) {
				//////// 200 ~ 299 ////////
				case 2:
					if (statusCode === 204) {
						// No-Content
						return Promise.resolve(new FetchResponse(
							statusCode, 
							Promise.resolve({})
						));
					}
					return Promise.resolve(new FetchResponse(statusCode, res.json()));

				//////// 400 ~ 499 ////////
				case 4:
					return Promise.reject(new FetchResponse(statusCode, res.json()));
				
				//////// 500 ~ 599 ////////
				case 5:
					return Promise.reject(new FetchResponse(statusCode, res.json()));

				default:
					break;
			}
			
			return Promise.resolve(new FetchResponse(statusCode, res.json()));
		})
		.then(async (res) => {
			const response = await res.response;
			const result = {
				statusCode: res.statusCode,
				...response
			};
			if (typeof (callback) === 'function') {
				callback(result);
			}

			return result;
		})
		.catch(async (err) => {
			const response = await err.response;
			const result = {
				statusCode: err.statusCode,
				...response
			};
			if (typeof (failed) === 'function') {
				failed(result);
			}
			
			return result;
		});
}


/**
 * Converting Query parameters to string
 * 
 * @example
 * const params = {
 *   search: 'search keyword',
 *   category: 'IMAGE'
 * }
 * const result = paramsToQuery(params);
 * console.log(result); // "search=search+keyword&category=IMAGE"
 */
export const paramsToQuery = (params: apiType.QueryParams): URLSearchParams => new URLSearchParams(params);

export default Fetch