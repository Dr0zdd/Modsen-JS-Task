import { fetchImages } from './api.js';
import { ImageSliderModal } from './ImageSliderModal.js';

let apiImages = [];

async function loadGallery(query = 'nature') {
    try {
        apiImages = await fetchImages(query);
        renderImages(apiImages);
    } catch (error) {
        console.error('Error loading images', error);
    }
}

function renderImages(images) {
    const gallery = document.querySelector('.card__wrapper');
    if (!gallery) return;

    gallery.innerHTML = images.map((image, index) => `
        <article class="card__item" data-index="${index}">
            <img class="card__img" src="${image.urls.regular}" alt="${image.alt_description}">
        </article>
    `).join('');
}

function openModal(currentIndex) {
    if (!apiImages.length) return;

    document.querySelector('.modal')?.remove();

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
    const image = e.target.closest('.card__img');
    if (image) openModal(parseInt(image.parentElement.dataset.index));
});

document.addEventListener('DOMContentLoaded', loadGallery);
