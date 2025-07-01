import { fetchImages } from './api.js';
import { ImageSliderModal } from './ImageSliderModal.js';

let apiImages = [];

async function loadGallery(query = 'nature') {
    try {
        apiImages = await fetchImages(query);
        renderImages(apiImages);
    } catch (error) {
        console.error('Ошибка загрузки изображений:', error);
    }
}

export async function getApiImages() {
    return apiImages.length ? apiImages : await fetchImages('nature');
}

export function renderImages(images) {
    const gallery = document.querySelector('.card__wrapper');
    if (!gallery) return;

    gallery.innerHTML = images.length
        ? images.map((image, index) => `
            <article class="card__item" data-id="${image.id}" data-index="${index + 1}"> 
                <img class="card__img" src="${image.urls.regular}" alt="${image.alt_description || 'Без описания'}">
            </article>
        `).join('')
        : '<p class="no-results">Изображения не найдены</p>';
}

function openModal(imageId) {
    if (!apiImages.length) return;

    document.querySelector('.modal')?.remove();

    const currentIndex = apiImages.findIndex(img => img.id === imageId);
    if (currentIndex === -1) return;

    const modal = new ImageSliderModal(apiImages.map(img => img.urls.regular), currentIndex);
    modal.buildModal();

    document.body.classList.add('modal-open');

    const closeModal = () => {
        document.body.classList.remove('modal-open');
    };

    modal.modal.querySelector('.modal__close').addEventListener('click', closeModal);
    modal.modal.querySelector('.modal__overlay').addEventListener('click', closeModal);
}

document.querySelector('.card__wrapper')?.addEventListener('click', (e) => {
    const card = e.target.closest('.card__item');
    if (card) {
        openModal(card.dataset.id);
    }
});

document.addEventListener('DOMContentLoaded', loadGallery);
