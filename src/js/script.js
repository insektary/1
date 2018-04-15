const menuLogo = document.querySelector('.logo--menu');
const header = document.querySelector('.header');
const HEADER_VISIBLE = 'flex';
const HEADER_HIDDEN = 'none';
const MENU_LOGO_VISIBLE = '1';
const MENU_LOGO_HIDDEN = '0';

const scrollAnalisys = () => {
    if (window.innerWidth > 1100) return;

    if (document.documentElement.scrollTop > 0) {
        menuLogo.style.opacity = MENU_LOGO_VISIBLE;
        header.style.display = HEADER_HIDDEN;
    } else {
        menuLogo.style.opacity = MENU_LOGO_HIDDEN;
        header.style.display = HEADER_VISIBLE;
    }
};

window.addEventListener('scroll', scrollAnalisys);