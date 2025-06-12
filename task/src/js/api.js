export async function fetchImages(query) {
    const API_URL = `https://api.unsplash.com/search/photos?query=${query}&client_id=${API_KEY}&per_page=12`;

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            console.error(`Ошибка: ${response.status}`); // Логируем ошибку вместо throw
            return [];
        }

        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Ошибка загрузки изображений:', error);
        return [];
    }
}
