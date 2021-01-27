import Fetch from 'controllers/fetch'

/* 
		v1
		Sample API
*/
export const userInfo = () => {
	return Fetch('/api/v1/auth', 'GET')
		.then(res => {
			if (res.success) {
				return res.result;
			}
		})
		.catch(err => {
			return Promise.reject(err.message);
		})
}