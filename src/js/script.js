const menuLogo = document.querySelector('.logo--menu');
const nav = document.querySelector('.nav');
const buttonHome = document.querySelector('.button-home');
const OFFSET_MIN = 10;
const TABLET_WIDTH = 1100;
const MOBILE_WIDTH = 780;
const ENTER_CODE = 13;
const MAX_OFFSET_Y = 500;
const OFFSET_TITLE_DESKTOP = 90;
const OFFSET_TITLE_MOBILE = 50;

let screenMode;
let offsetMax;

const screenModeDetect = () => {
    const screenWidth = document.documentElement.clientWidth;
    let newScreenMode;

    if (screenWidth < TABLET_WIDTH) {
        newScreenMode = 'tablet';
        offsetMax = OFFSET_TITLE_DESKTOP;

        if (screenWidth < MOBILE_WIDTH) {
            newScreenMode = 'mobile';
            offsetMax = OFFSET_TITLE_MOBILE;
        }
    } else {
        newScreenMode = 'desktop';
    }

    if (newScreenMode !== screenMode) {
        screenMode = newScreenMode;

        adaptPage(screenMode);
    }
};

const adaptPage = (screenMode) => {
    if (screenMode !== 'desktop') {
        window.addEventListener('scroll', scrollAnalisys);
    } else {
        window.removeEventListener('scroll', scrollAnalisys);

        nav.className = 'nav';
        menuLogo.className = 'logo logo--menu';
    }
};

const scrollAnalisys = () => {
    const verticalOffset = window.pageYOffset;

    if (verticalOffset > offsetMax) {
        nav.className = 'nav nav--fixed';
        menuLogo.className = 'logo logo--menu logo--visible';
    } else if (verticalOffset < OFFSET_MIN) {
        nav.className = 'nav';
        menuLogo.className = 'logo logo--menu';
    }

    if (verticalOffset > MAX_OFFSET_Y) {
        buttonHome.style.display = 'block';
    } else {
        buttonHome.style.display = 'none';
    }
};

const clickOnTitle = ({ target }) => {
    target.setAttribute('contenteditable', true);
    target.style.cursor = 'text';
};

const clickOutOfTitle = ({ target }) => {
    target.setAttribute('contenteditable', false);
    target.style.cursor = 'pointer';
};

const keyPress = ({ keyCode }) => {
    if (keyCode === ENTER_CODE) {
        document.querySelectorAll('.post__title').forEach((title) => {
            title.readOnly = true;
            title.blur();
        });
    }
};

const mediaIncrement = ({ currentTarget }) => {
    document.querySelectorAll(`.${ currentTarget.className.split(' ')[1] }`).forEach((mediaButton) => {
        if (mediaButton.getAttribute('post_id') === currentTarget.getAttribute('post_id')) {
            mediaButton.childNodes[1].innerHTML++;
        }
    });
};

const toHome = () => {
    window.scrollTo(0, 0);
};

document.querySelectorAll('.post__title').forEach((title) => {
    title.addEventListener('click', clickOnTitle);
    title.addEventListener('blur', clickOutOfTitle);
});

document.querySelectorAll('.media-button').forEach((mediaButton) => {
    mediaButton.addEventListener('click', mediaIncrement);
});

window.addEventListener('resize', screenModeDetect);
window.addEventListener('keydown', keyPress);
buttonHome.addEventListener('click', toHome);

screenModeDetect();

fetch('/media-data.json')
    .then((response) => response.json())
    .then((mediaData) => {
        document.querySelectorAll('.media-button').forEach((mediaButton) => {
            const buttonClass = mediaButton.className.split('--')[1];
            const post = mediaData.find((post) => (post.post_id === parseInt(mediaButton.getAttribute('post_id'))));
            const result = post.media[buttonClass];

            if (result || result === 0) {
                mediaButton.childNodes[1].innerHTML = result;
            }
        });
    });