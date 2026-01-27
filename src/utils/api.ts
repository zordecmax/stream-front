export async function apiFetch(url: string, init: RequestInit = {}) {
	const headers = new Headers(init.headers || {});
	// Attach token from localStorage if available
	if (typeof window !== 'undefined') {
		const token = window.localStorage.getItem('HYPE_auth_token');
		if (token) headers.set('Authorization', `Bearer ${token}`);
	}
	return fetch(url, { ...init, headers });
}

