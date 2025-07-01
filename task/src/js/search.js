import { getApiImages, renderImages } from './gallery.js';

const searchInput = document.getElementById('searchInput');
const allowedCharsRegex = /^[a-zA-Z0-9!$&*\-=_^`|~#%'+/?_{}]+$/;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchButton')?.addEventListener('click', handleSearch);
    setTimeout(logImageDetails, 1000);
});

async function handleSearch() {
    const searchValue = searchInput?.value.trim().toLowerCase();

    if (!searchValue || searchValue.length < 3 || !allowedCharsRegex.test(searchValue)) {
        searchInput.classList.add('invalid');
        const allImages = await getApiImages();
        renderImages(allImages);
        return;
    }

    searchInput.classList.remove('invalid');


    const apiImages = await getApiImages();
    const filtered = filterImages(apiImages, searchValue);
    renderImages(filtered.length ? filtered : apiImages);
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

    apiImages.forEach(({ id, slug }, index) =>
        console.log(`${index + 1}. ID: ${id} | Slug: ${slug}`)
    );
}
