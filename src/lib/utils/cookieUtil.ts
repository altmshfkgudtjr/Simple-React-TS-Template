/**
 * Get Cookie
 * @category Lib / Util
 * 
 * @param cookieKey Cookie Name
 */
export const getCookie = (cookieKey: string) => {
	let cookieValue: string = "";
	if(document.cookie){
			let array = document.cookie.split((escape(cookieKey)+'='));
			if(array.length >= 2){
					let arraySub = array[1].split(';');
					cookieValue = unescape(arraySub[0]);
			}
	}
	
	return cookieValue;
}

/**
 * Set Cookie
 * @category Lib / Util
 * 
 * @param cookieKey Cookie Name
 * @param cookieValue Cookie Value
 * @param cookieExpired Cookie expiration time from now (minute)
 * @param isSecure Cookie only HTTPS Network
 * @param cookiePath Cookie path (Default: '/')
 */
export const setCookie = (
	cookieKey: string, 
	cookieValue: string, 
	cookieExpired: number, 
	isSecure: boolean,
	cookiePath: string = '/'
) => {
	const date = new Date();
	date.setTime(date.getTime() + cookieExpired * 60 * 60 * 1000);

	let cookie = `${escape(cookieKey)}=${escape(cookieValue)}`;
	cookie+=(cookieExpired ? '; EXPIRES='+date.toUTCString() : '');
	cookie+=(cookiePath ? '; PATH='+cookiePath : '');
	cookie+=(isSecure ? '; SECURE' : '');

	document.cookie = cookie;
}