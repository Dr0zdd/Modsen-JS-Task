import { getFavorites, clearFavorites } from './favoritesStorage.js';
import { ImageSliderModal } from './ImageSliderModal.js';

document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.card__wrapper');
    const favorites = getFavorites();

    if (!wrapper) return;

    if (!favorites.length) {
        wrapper.innerHTML = `
      <div class="no-results">
        <p>You haven’t saved any images yet.</p>
        <a href="index.html" class="back-to-gallery">← Go to Gallery</a>
      </div>
    `;
        return;
    }

    wrapper.innerHTML = favorites.map((item, index) => `
    <article class="card__item" data-index="${index}">
      <img class="card__img" src="${item.url}" alt="${item.alt || ''}">
    </article>
  `).join('');


    wrapper.addEventListener('click', e => {
        const card = e.target.closest('.card__item');
        if (!card) return;

        const index = Number(card.dataset.index);
        const modal = new ImageSliderModal(favorites, index);
        modal.buildModal();
    });
});

document.querySelector('.clear-favorites')?.addEventListener('click', () => {
    if (confirm('Удалить все изображения из избранного?')) {
        clearFavorites();
        location.reload();
    }
});
