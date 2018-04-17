const menuLogo = document.querySelector('.logo--menu');
const nav = document.querySelector('.nav');
const OFFSET_MIN = 10;
const TABLET = 1100;
const MOBILE = 780;

let offsetMax;

const deviceDetect = () => {
    const newScreenWidth = document.documentElement.clientWidth;

    if (newScreenWidth < TABLET) {
        offsetMax = 90;

        if (newScreenWidth < MOBILE) {
            offsetMax = 50;
        }

        window.addEventListener('scroll', scrollAnalisys);
    } else {
        window.removeEventListener('scroll', scrollAnalisys);

        nav.className = 'nav';
        menuLogo.className = 'logo logo--menu';
    }
};

const scrollAnalisys = () => {
    if (window.pageYOffset > offsetMax) {
        nav.className = 'nav nav--fixed';
        menuLogo.className = 'logo logo--menu logo--visible';
    } else if (window.pageYOffset < OFFSET_MIN) {
        nav.className = 'nav';
        menuLogo.className = 'logo logo--menu';
    }
};

window.addEventListener('resize', deviceDetect);

deviceDetect();