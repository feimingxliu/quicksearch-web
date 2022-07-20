
let baseUrl = 'http://localhost:9200/'

// `VITE_BASE_URL` is custom defined env, not `BASE_URL`.
if (import.meta.env.VITE_BASE_URL) {
    baseUrl = import.meta.env.VITE_BASE_URL
}

export {
    baseUrl
}