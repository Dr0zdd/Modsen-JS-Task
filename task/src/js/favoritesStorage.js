let storageKey = 'unsplash-favorites';

export function initFavoritesStorage(key) {
    if (typeof key === 'string' && key.trim()) {
        storageKey = key;
    } else {
        console.warn('initFavoritesStorage: недопустимый ключ, используется по умолчанию');
    }
}

export function getFavorites() {
    try {
        const raw = localStorage.getItem(storageKey);
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        console.warn('favoritesStorage: некорректные данные в localStorage');
        return [];
    }
}

export function isFavorite(id) {
    return getFavorites().some(item => item.id === id);
}

export function addFavorite(item) {
    if (!item?.id || !item?.url) return;

    const existing = getFavorites();
    if (!existing.some(fav => fav.id === item.id)) {
        existing.push({ id: item.id, url: item.url, alt: item.alt || '' });
        localStorage.setItem(storageKey, JSON.stringify(existing));
    }
}

export function removeFavorite(id) {
    const filtered = getFavorites().filter(item => item.id !== id);
    localStorage.setItem(storageKey, JSON.stringify(filtered));
}

export function clearFavorites() {
    localStorage.removeItem(storageKey);
}
