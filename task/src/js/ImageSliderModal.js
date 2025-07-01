import {
    isFavorite,
    addFavorite,
    removeFavorite
} from './favoritesStorage.js';

export class ImageSliderModal {
    constructor(images, currentIndex = 0) {
        this.images = images;
        this.currentIndex = currentIndex;
        this.modal = null;
        this.imageElement = null;
        this.favBtn = null;
    }

    buildModal() {
        this.modal = document.createElement('div');
        this.modal.className = 'modal';

        const overlay = this.createElement('div', 'modal__overlay', () => this.closeModal());
        const modalContent = this.createElement('div', 'modal__content');
        const imgWrapper = this.createElement('div', 'modal__img-wrapper');

        this.imageElement = this.createElement('img', 'modal__img');
        this.setImage();

        const closeButton = this.createElement('button', 'modal__close', () => this.closeModal());
        const prevButton = this.createElement('button', 'modal__prev', () => this.prevImage());
        const nextButton = this.createElement('button', 'modal__next', () => this.nextImage());

        this.favBtn = this.createElement('button', 'modal__fav-btn', () => this.toggleFavorite());
        this.updateFavIcon();

        imgWrapper.append(this.imageElement, this.favBtn, closeButton);
        modalContent.append(prevButton, imgWrapper, nextButton);
        this.modal.append(overlay, modalContent);
        document.body.appendChild(this.modal);

        setTimeout(() => {
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            document.querySelector('.card__wrapper')?.classList.add('blurred');
        }, 10);
    }

    createElement(tag, className, handler = null) {
        const el = document.createElement(tag);
        el.className = className;
        if (handler) el.addEventListener('click', handler);
        return el;
    }

    getCurrentItem() {
        const img = this.images[this.currentIndex];

        if (typeof img === 'object') {
            if ('url' in img) {
                return {
                    id: img.id,
                    url: img.url,
                    alt: img.alt || ''
                };
            }

            if ('urls' in img) {
                return {
                    id: img.id,
                    url: img.urls?.regular,
                    alt: img.alt_description || ''
                };
            }
        }

        return {
            id: String(this.currentIndex),
            url: img,
            alt: ''
        };
    }


    setImage() {
        const { url, alt } = this.getCurrentItem();
        this.imageElement.src = url;
        this.imageElement.alt = alt;
    }

    updateImage() {
        this.setImage();
        this.updateFavIcon();
    }

    getCurrentId() {
        return this.getCurrentItem().id;
    }

    updateFavIcon(animate = false) {
        const id = this.getCurrentId();
        const iconName = isFavorite(id) ? 'heart-filled.svg' : 'heart-outline.svg';

        this.favBtn.innerHTML = `<img src="../src/img/${iconName}" alt="Favorite">`;

        if (animate) {
            this.favBtn.classList.add('clicked');
            setTimeout(() => this.favBtn.classList.remove('clicked'), 300);
        }
    }

    toggleFavorite() {
        const item = this.getCurrentItem();
        if (!item?.id) return;

        isFavorite(item.id) ? removeFavorite(item.id) : addFavorite(item);
        this.updateFavIcon(true);
    }

    prevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateImage();
    }

    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateImage();
    }

    closeModal() {
        this.modal.classList.remove('active');
        setTimeout(() => {
            this.modal.remove();
            document.body.style.overflow = '';
            document.querySelector('.card__wrapper')?.classList.remove('blurred');
        }, 300);
    }
}
