const THEME_KEY = 'user-preferred-theme';
const DEFAULT_THEME = 'light';

const themes = ['light', 'dark', 'pastel'];

const themeBtn = document.querySelector('[data-theme-toggler]');
const themeList = document.querySelector('.theme-list');

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    updateThemeIcon(theme);
}

function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const active = saved || DEFAULT_THEME;
    applyTheme(active);
}

function updateThemeIcon(theme) {
    const iconPaths = {
        light: '../src/img/sun-solid.svg',
        dark: '../src/img/moon-solid.svg',
        pastel: '../src/img/rainbow.png'
    };

    themeBtn.innerHTML = `<img src="${iconPaths[theme]}" alt="${theme} icon"/>`;
}


themeBtn.addEventListener('click', () => {
    const currentTheme = localStorage.getItem(THEME_KEY) || DEFAULT_THEME;
    themeList.classList.toggle('hidden');


    document.querySelectorAll('[data-theme-option]').forEach(item => {
        const itemTheme = item.dataset.themeOption;
        item.classList.toggle('active', itemTheme === currentTheme);
    });
});

document.querySelectorAll('[data-theme-option]').forEach(item => {
    item.addEventListener('click', () => {
        const selectedTheme = item.dataset.themeOption;
        applyTheme(selectedTheme);
        themeList.classList.add('hidden');
    });
});

initTheme();
