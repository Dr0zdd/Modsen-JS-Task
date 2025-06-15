export class ImageSliderModal {
    constructor(images, currentIndex = 0) {
        this.images = images;
        this.currentIndex = currentIndex;
        this.modal = null;
    }

    buildModal() {
        this.modal = document.createElement('div');
        this.modal.className = 'modal';

        const overlay = this.createElement('div', 'modal__overlay', () => this.closeModal());
        const modalContent = this.createElement('div', 'modal__content');
        const imgWrapper = this.createElement('div', 'modal__img-wrapper');

        this.imageElement = this.createElement('img', 'modal__img');
        this.imageElement.src = this.images[this.currentIndex];

        const closeButton = this.createElement('button', 'modal__close', () => this.closeModal());
        const prevButton = this.createElement('button', 'modal__prev', () => this.prevImage());
        const nextButton = this.createElement('button', 'modal__next', () => this.nextImage());

        imgWrapper.append(this.imageElement, closeButton);
        modalContent.append(prevButton, imgWrapper, nextButton);
        this.modal.append(overlay, modalContent);
        document.body.appendChild(this.modal);

        setTimeout(() => {
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            document.querySelector('.card__wrapper')?.classList.add('blurred');
        }, 10);
    }

    createElement(tag, className, eventHandler = null) {
        const element = document.createElement(tag);
        element.className = className;
        if (eventHandler) element.addEventListener('click', eventHandler);
        return element;
    }

    prevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateImage();
    }

    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateImage();
    }

    updateImage() {
        if (this.images[this.currentIndex]) {
            this.imageElement.src = this.images[this.currentIndex];
        }
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
