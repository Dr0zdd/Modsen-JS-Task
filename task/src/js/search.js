import { getApiImages, renderImages } from './gallery.js';

const searchInput = document.getElementById('searchInput');
const hintsContainer = document.getElementById('searchHints');
const allowedCharsRegex = /^[a-zA-Z0-9!$&*\-=_^`|~#%'+/?_{}]+$/;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchButton')?.addEventListener('click', handleSearch);
    searchInput?.addEventListener('input', handleSearchHints);
});

async function handleSearch() {
    const searchValue = searchInput?.value.trim().toLowerCase();

    if (!searchValue.length) {
        const allImages = await getApiImages();
        renderImages(allImages);
        searchInput.classList.remove('invalid');
        return;
    }

    const apiImages = await getApiImages();
    if (!apiImages.length) return;

    const filteredImages = filterImages(apiImages, searchValue);
    renderImages(filteredImages.length ? filteredImages : apiImages);
}

async function handleSearchHints() {
    const searchValue = searchInput?.value.trim().toLowerCase();
    if (!searchValue || searchValue.length < 3 || !allowedCharsRegex.test(searchValue)) return;

    const apiImages = await getApiImages();
    hintsContainer.innerHTML = '';

    const matchingHints = apiImages
        .map(({ alt_description }) => alt_description?.toLowerCase())
        .filter(desc => desc?.includes(searchValue))
        .slice(0, 5);

    hintsContainer.innerHTML = matchingHints.length ? `<p>Совпадения: ${matchingHints.join(', ')}</p>` : '';
}


function filterImages(images, searchValue) {
    return images.filter(({ alt_description, id }, index) =>
        (alt_description || '').toLowerCase().includes(searchValue) ||
        String(id) === searchValue ||
        String(index + 1) === searchValue
    );
}


async function logImageDetails() {
    const apiImages = await getApiImages();
    if (!apiImages.length) return;

    console.log('ID и Slug изображений:');
    apiImages.forEach(({ id, slug }, index) =>
        console.log(`${index + 1}. ID: ${id} | Slug: ${slug}`)
    );
}

document.addEventListener('DOMContentLoaded', () => setTimeout(logImageDetails, 1000));
