const weight = document.querySelector('.weight-value__value');
const sizeItems = document.querySelectorAll('.size-item');
const sizeBox = document.querySelector('.size-box');
const countButton = document.querySelector('.count-button');
const ZIP_EXP = /[0-9]{6}/;
const PHONE_EXP = /[0-9]{10}/;
const RU_EXP = /^[а-яА-Я]+$/;
const EMAIL_EXP = /^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i;

const countWeight = () => {
    const value = document.querySelector('.weight-range').value;
    const measure = document.querySelector('.weight-measure').value;
    const ratio = (measure === 'kg') ? 1 : 2.2;

    weight.innerHTML = Math.round(value * ratio * 100) / 100;
};

const countSize = ({ target }) => {
    const measureClass = target.className.split('__')[1];

    sizeItems.forEach((item) => {
        if (item.className.split('--')[1] === measureClass) {
            item.innerHTML = target.value;
        }
    })
};

const showSizeBox = ({ target }) => {
    if (target.checked) {
        sizeBox.style.display = 'flex';
    } else {
        sizeBox.style.display = 'none';
    }
};

const onSubmit = () => {
    console.log('submit!');
};

const checkInput = ({ target }) => {
    let REGEXP;

    switch (target.name) {
        case 'zip':
            REGEXP = ZIP_EXP;
            break;
        case 'phone':
            REGEXP = PHONE_EXP;
            break;
        case 'name':
        case 'subname':
        case 'fathername':
        case 'city':
        case 'street':
            REGEXP = RU_EXP;
            break;
        case 'email':
            REGEXP = EMAIL_EXP;
            break;
        default:
            REGEXP = /^[а-яА-Я0-9]+$/;
    }

    if (target.value) {
        if(REGEXP.test(target.value)) {
            target.style.border = '1px solid transparent';
            target.setAttribute('correctly', 'true');
            target.style.backgroundPositionX = '98%';
            target.parentNode.className = 'input-wrapper';
        } else {
            target.style.border = '1px solid red';
            target.setAttribute('correctly', 'false');
            target.style.backgroundPositionX = '198%';
            target.parentNode.className = 'input-wrapper input-wrapper--help input-wrapper--help-' + target.name;
        }
    } else {
        target.style.border = '1px solid transparent';
        target.setAttribute('correctly', 'false');
        target.style.backgroundPositionX = '198%';
        target.parentNode.className = 'input-wrapper';
    }

    checkAll();
};

const removeHelp = ({ target }) => {
    target.parentNode.className = 'input-wrapper';
};

const checkAll = () => {
    if ([].every.call(document.querySelectorAll('.address-input'),
            (input) => input.getAttribute('correctly') === 'true')) {
        countButton.style.color = 'orange';
        countButton.style.cursor = 'pointer';
    } else {
        countButton.style.color = '#4c4c4c';
        countButton.style.cursor = 'default';
    }

};

document.querySelector('.weight-range').addEventListener('input', countWeight);
document.querySelector('.weight-measure').addEventListener('change', countWeight);
document.querySelector('.size__checkbox').addEventListener('click', showSizeBox);
document.querySelector('.control').addEventListener('submit', onSubmit);
document.querySelectorAll('.size-range').forEach((range) => {
    range.addEventListener('input', countSize)
});
document.querySelectorAll('.address-input').forEach((input) => {
    input.setAttribute('correctly', 'false');
    input.addEventListener('input', checkInput);
    input.addEventListener('blur', removeHelp);
});