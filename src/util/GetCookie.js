export function GetCookie() {
	let cookie = decodeURIComponent(document.cookie);
	return cookie.split(";")[1].split("=")[1];
}
