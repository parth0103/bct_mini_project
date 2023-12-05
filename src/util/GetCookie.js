export function GetCookie() {
	let cookie = decodeURIComponent(document.cookie);
	console.log("cookie", cookie);
	return cookie.split("=")[1];
}
