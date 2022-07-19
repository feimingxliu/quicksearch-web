
let baseUrl = 'http://localhost:9200/'

if (import.meta.env.VITE_BASE_URL != '') {
    baseUrl = import.meta.env.VITE_BASE_URL
}

export {
    baseUrl
}