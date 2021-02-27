import Fetch from 'controllers/fetch'

/**
 * Sample API
 * @version 1
 */
export const userInfo_v1 = () => {
	return Fetch('/api/auth/user', 'GET')
		.then(res => {
			if (res.verify) {
				return res.result;
			}
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

/**
 * Sample API
 * @version 2
 */
export const userInfo_v2 = () => {
	return Fetch<{name: string, birth: number}>('/api/auth/user', 'GET')
		.then(res => {
			if (res.verify) {
				return res.result;
			}
		})
		.catch(err => {
			return Promise.reject(err);
		});
}

/**
 * Sample API
 * @version 1
 */
export const sendPost = () => {
	const sendData = new FormData();
	sendData.append('key', 'value');
	return Fetch('/api/user/post', 'POST')
		.then(res => {
			if (res.verify) {
				return res.result;
			}
		})
		.catch(err => {
			return Promise.reject(err);
		})
}