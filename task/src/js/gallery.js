import { fetchImages } from './api.js';

async function loadGallery() {
    const images = await fetchImages('nature'); // Можно изменить запрос
    renderImages(images);
}

function renderImages(images) {
    const gallery = document.querySelector('.card__wrapper');
    gallery.innerHTML = ''; // Очищаем перед загрузкой новых фото

    images.forEach((image, index) => {
        const card = document.createElement('article');
        card.classList.add('card__item');
        card.setAttribute('data-category', index + 1);

        const img = document.createElement('img');
        img.classList.add('card__img');
        img.src = image.urls.small;
        img.alt = image.alt_description;

        card.appendChild(img);
        gallery.appendChild(card);
    });
}

// Запускаем загрузку изображений при загрузке страницы
document.addEventListener('DOMContentLoaded', loadGallery);
