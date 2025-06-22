const THEME_KEY = 'user-preferred-theme';
const DEFAULT_THEME = 'light';
const themeBtn = document.querySelector('[data-theme-toggler]');

const themes = ['light', 'dark', 'pastel'];

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

function getNextTheme(currentTheme) {
    const index = themes.indexOf(currentTheme);
    const nextIndex = (index + 1) % themes.length;
    return themes[nextIndex];
}

themeBtn.addEventListener('click', () => {
    const currentTheme = localStorage.getItem(THEME_KEY) || DEFAULT_THEME
    const nextTheme = getNextTheme(currentTheme);
    applyTheme(nextTheme);
});

function updateThemeIcon(theme) {
    const iconPaths = {
        light: '../src/img/sun-solid.svg',
        dark: '../src/img/moon-solid.svg',
        pastel: '../src/img/rainbow.png'
    };

    themeBtn.innerHTML = `<img src="${iconPaths[theme]}" alt="${theme} icon"/>`;
}

initTheme();


