const API_KEY = '45308100-fb5f56041b1d1802d13a23a9f';
const BASE_URL = `https://pixabay.com/api/?orientation=horizontal&key=${API_KEY}&image_type=photo`;

function fetchImage (searchQuery, page, per_page) {
	return fetch(`${BASE_URL}&q=${searchQuery}&page=${page}&per_page=${per_page}`)
	.then(res => {
		if (res.ok) {
			return res.json();
		}

		return Promise.reject(new Error(`Нет изображений по запросу ${searchQuery}`))
	})
}

const api = {
	fetchImage
};

export default api;