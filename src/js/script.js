'use strict';
require('./libs/jquery.js');
require('./libs/jquery.maskedinput-1.2.2.js');
require('./libs/jquery.autocomplete.js');

const weight = document.querySelector('.weight-value__value');
const sizeItems = document.querySelectorAll('.size-item');
const sizeBox = document.querySelector('.size-box');
const countButton = document.querySelector('.count-button');
const ZIP_EXP = /[0-9]{6}/;
const RU_EXP = /^[а-яА-Я]+$/;
const EMAIL_EXP = /^.+\@.{2,}\..{2,}$/i;
const xhr = new XMLHttpRequest();
let PRICES;
let TIMER;

const countWeight = () => {
    const weightValue = document.querySelector('.weight-range').value;
    const measure = document.querySelector('.weight-measure').value;
    const ratio = (measure === 'kg') ? 1 : 2.2;

    weight.innerHTML = Math.round(weightValue * ratio * 100) / 100;

    if (TIMER) {
        clearTimeout(TIMER);
    }

    TIMER = setTimeout(countAll, 500);
};

const countSize = ({ target }) => {
    const measureClass = target.className.split('__')[1];
    console.log('1');
    Array.prototype.forEach.call(sizeItems, (item) => {
        if (item.className.split('--')[1] === measureClass) {
            item.innerHTML = target.value;
        }
    });

    if (TIMER) {
        clearTimeout(TIMER);
    }

    TIMER = setTimeout(countAll, 500);
};

const showSizeBox = ({ target }) => {
    if (target.checked) {
        sizeBox.style.display = 'flex';
    } else {
        sizeBox.style.display = 'none';
    }
};

const onSubmit = () => {
    const form = document.querySelector('.control').elements;
    const data = {};

    for (let input of form) {
        if (input.type === 'checkbox') {
            data[input.name] = input.checked;
        } else {
            data[input.name] = input.value;
        }
    }

    console.log(data);
};

const checkRegExp = (target) => {
    let REGEXP;

    switch (target.name) {
        case 'zip':
            REGEXP = ZIP_EXP;
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

    return REGEXP;
};

const checkInput = ({ target }) => {
    const REGEXP = checkRegExp(target);

    if (target.value) {
        if(REGEXP.test(target.value)) {
            target.style.border = '1px solid transparent';
            target.setAttribute('correctly', 'true');
            target.style.backgroundPositionX = '98%';

            removeHelp({target});

        } else {
            target.style.border = '1px solid red';
            target.setAttribute('correctly', 'false');
            target.style.backgroundPositionX = '198%';

            showHelp(target);
        }
    } else {
        target.style.border = '1px solid transparent';
        target.setAttribute('correctly', 'false');
        target.style.backgroundPositionX = '198%';

        removeHelp({target});
    }

    checkAll();
};

const removeHelp = ({ target }) => {
    target.parentNode.querySelector('.help__content').style.display = 'none';
    target.parentNode.querySelector('.help__arrow').style.display = 'none';
};

const checkAll = () => {
    if (Array.prototype.every.call(document.querySelectorAll('.address__input'),
            (input) => input.getAttribute('correctly') === 'true')) {
        countButton.style.color = 'orange';
        countButton.style.cursor = 'pointer';
        countButton.disabled = '';
    } else {
        countButton.style.color = '#4c4c4c';
        countButton.style.cursor = 'default';
        countButton.disabled = 'disable';
    }

};

const showHelp = ({ parentNode }) => {
    const helpContent = parentNode.querySelector('.help__content');
    const helpArrow = parentNode.querySelector('.help__arrow');

    helpContent.style.display = 'block';
    helpArrow.style.display = 'block';
};

const checkPhone = () => {
    const inputPhone = document.querySelector('.address__input--phone');

    if (inputPhone.value.indexOf('_') === -1) {
        inputPhone.style.border = '1px solid transparent';
        inputPhone.setAttribute('correctly', 'true');
        inputPhone.style.backgroundPositionX = '98%';
    } else {
        inputPhone.style.border = '1px solid red';
        inputPhone.setAttribute('correctly', 'false');
        inputPhone.style.backgroundPositionX = '198%';
    }
};

const countAll = () => {
    const priceItems = document.querySelectorAll('.company-price__item');
    const termsItem = document.querySelectorAll('.company-term__term');
    const weightValue = document.querySelector('.weight-range').value;
    const lengthValue = document.querySelector('.size-range__length').value;
    const widthValue = document.querySelector('.size-range__width').value;
    const heightValue = document.querySelector('.size-range__height').value;
    const isSises = document.querySelector('.size__checkbox').checked;
    const country = document.querySelector('.address-country').value;

    Array.prototype.forEach.call(priceItems, (item) => {
        const companyName = item.className.split('--')[1];
        const price = PRICES.find((companyPrice) => companyPrice.name === companyName);

        if(isSises) {
            item.innerHTML = Math.round(5 * price.ratio_country[country]
                * (weightValue * price.ratio_weight)
                * (lengthValue * price.ratio_size)
                * (widthValue * price.ratio_size)
                * (heightValue * price.ratio_size));
        } else {
            item.innerHTML = Math.round(5 * price.ratio_country[country]
                * (weightValue * price.ratio_weight));
        }
    });

    Array.prototype.forEach.call(termsItem, (item) => {
        const companyName = item.className.split('--')[1];
        const price = PRICES.find((companyPrice) => companyPrice.name === companyName);

        item.innerHTML = price.therms[country];
    })
};

document.querySelector('.weight-range').addEventListener('change', countWeight);
document.querySelector('.weight-range').addEventListener('input', countWeight);
document.querySelector('.weight-measure').addEventListener('change', countWeight);
document.querySelector('.size__checkbox').addEventListener('click', showSizeBox);
document.querySelector('.size__checkbox').addEventListener('click', countAll);
document.querySelector('.count-button').addEventListener('click', onSubmit);
document.querySelector('.address-country').addEventListener('change', countAll);
document.querySelector('.address__input--phone').addEventListener('keyup', checkPhone);
Array.prototype.forEach.call(document.querySelectorAll('.size-range'), (range) => {
    range.addEventListener('input', countSize);
    range.addEventListener('change', countSize);
});
Array.prototype.forEach.call(document.querySelectorAll('.address__input'), (input) => {
    input.setAttribute('correctly', 'false');
    input.addEventListener('input', checkInput);
    input.addEventListener('blur', removeHelp);
});

xhr.open('GET', 'prices.json', false);
xhr.send();
if (xhr.status !== 200) {
    alert('Невозможно загрузить стоимость доставки');
} else {
    PRICES = JSON.parse(xhr.responseText);
}

jQuery(function($) {
    $.mask.definitions['~']='[+-]';

    $('#phone').mask('(999) 999-99-99');
});

$(document).ready(function(){

    $("#city").autocompleteArray([
        'Абакан',
        'Азамар',
        'Актау',
        'Актобе',
        'Алдан',
        'Томск',
        'Трехгорный',
        'Туапсе',
        'Тула',
        'Рязань'],
    {
        delay: 10,
        minChars: 1,
        matchSubset: 1,
        autoFill: true,
        maxItemsToShow: 10
    }
);
});
