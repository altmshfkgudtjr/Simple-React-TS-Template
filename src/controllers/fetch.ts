// API Ruturn type
type FetchResult<T> = {
	verify: boolean,
	message: string,
	data: T
};

// API Error type
type FetchError = {
	statusCode: number,
	response: any
};

// REST API Method
type HttpMethod = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';

const Fetch = <T = any, U = object | FormData>(
	url: string,
	method: HttpMethod,
	sendData?: U,
	callback?: (res: FetchResult<T>) => void,
	failed?: (res: FetchError) => void
): Promise<FetchResult<T>> => {
	/* JWT Auto Authroization using WebStorage */
	/* If you do not use the webStorage method and use the cookie, please modify this part. */
	const token = localStorage.getItem('tk');
	let authorization;
	if (token === null || token === undefined || token === 'undefined') {
		authorization = {};
	} else {
		authorization = { 'Authorization': "Bearer " + token };
	}

	/* init request form */
	const isFormData = !!sendData && checkFormData(sendData)
		? true
		: false;

	let request: object = {};
	if (method === 'GET') {
		request = {
			method: 'GET',
			headers: authorization
		};
	} else {
		request = {
			method,
			headers: isFormData
				? {}
				: Object.assign(authorization, {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}),
			body: isFormData
				? sendData
				: JSON.stringify(sendData)
		}
	}

	return fetch(url, request)
		.then(res => {
			/* Apply common logic for each HTTP status code */
			switch (Math.floor(res.status / 100)) {
				case 4:
					// some code
					return Promise.reject({
						statusCode: res.status,
						response: res.json()
					});
				case 5:
					// some code
					return Promise.reject({
						statusCode: res.status,
						response: res.json()
					});
				default:
					break;
			}

			return res.json();
		})
		.then(res => {
			if (typeof (callback) === 'function') {
				callback(res);
			}

			return res;
		})
		.catch(async (err) => {
			let result: FetchError = await err.response;
			result = {
				...err,
				response: result
			};
			if (typeof (failed) === 'function') {
				failed(result);
			}

			return Promise.reject(result);
			/* or use the method below. */
			// return result;
		});
}

const checkFormData = (data: any): boolean => data.constructor.toString().slice(9).startsWith('FormData');

export default Fetch