'use strict';

require('./libs/jquery.js');
require('./libs/jquery.maskedinput-1.2.2.js');
require('./libs/jquery.autocomplete.js');

if (!Array.prototype.find) {
    Array.prototype.find = function(callback, context) {
        for (let i = 0; i < this.length; i++) {
            if (callback.call(context, this[i], i, this)) {
                return this[i];
            }
        }
    }
}

const priceItems = document.querySelectorAll('.company-price__item');
const termsItem = document.querySelectorAll('.company-term__term');
const weight = document.querySelector('.weight-range');
const length = document.querySelector('.size-range__length');
const width = document.querySelector('.size-range__width');
const height = document.querySelector('.size-range__height');
const isSises = document.querySelector('.size__checkbox');
const country = document.querySelector('.address-country');
const weightDisplay = document.querySelector('.weight-value__value');
const sizeItems = document.querySelectorAll('.size-item');
const sizeBox = document.querySelector('.size-box');
const countButton = document.querySelector('.count-button');
const form = document.querySelector('.control').elements;
const measure = document.querySelector('.weight-measure');
const inputPhone = document.querySelector('.input-wrapper__input--phone');
const regExps = {
    zip: /[0-9]{6}/,
    ru: /^[а-яА-Я]+$/,
    email: /^.+\@.{2,}\..{2,}$/i,
    phone: /^[- ()0-9]+$/,
    default: /^[а-яА-Я0-9]+$/
};
const RATIO_KG = 1;
const RATIO_LBS = 2.2;
const RANGE_DELAY = 500; //ms
const CONVENTIONAL_UNIT = 5;

let PRICES;
let TIMER;

const countWeight = () => {
    const ratio = (measure.value === 'kg') ? RATIO_KG : RATIO_LBS;

    weightDisplay.innerHTML = Math.round(weight.value * ratio * 100) / 100;

    if (TIMER) {
        clearTimeout(TIMER);
    }

    TIMER = setTimeout(countAll, RANGE_DELAY);
};

const countSize = ({ target }) => {
    const measureClass = target.className.split('__')[1];

    [].forEach.call(sizeItems, (item) => {
        if (item.className.split('--')[1] === measureClass) {
            item.innerHTML = target.value;
        }
    });

    if (TIMER) {
        clearTimeout(TIMER);
    }

    TIMER = setTimeout(countAll, RANGE_DELAY);
};

const showSizeBox = ({ target }) => {
    if (target.checked) {
        sizeBox.style.display = 'flex';
    } else {
        sizeBox.style.display = 'none';
    }
};

const onSubmit = () => {
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
            REGEXP = RegExp.zip;
            break;
        case 'name':
        case 'subname':
        case 'fathername':
        case 'city':
        case 'street':
            REGEXP = regExps.ru;
            break;
        case 'email':
            REGEXP = regExps.email;
            break;
        case 'phone':
            REGEXP = regExps.phone;
            break;
        default:
            REGEXP = regExps.default;
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
    target.parentNode.querySelector('.input-wrapper__help').style.display = 'none';
    target.parentNode.querySelector('.input-wrapper__arrow').style.display = 'none';
};

const checkAll = () => {
    if (Array.prototype.every.call(document.querySelectorAll('.input-wrapper__input'),
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
    parentNode.querySelector('.input-wrapper__help').style.display = 'block';
    parentNode.querySelector('.input-wrapper__arrow').style.display = 'block';
};

const checkPhone = () => {
    if (regExps.phone.test(inputPhone.value)) {
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

    [].forEach.call(priceItems, (item) => {
        const companyName = item.className.split('--')[1];
        const price = PRICES.find((companyPrice) => companyPrice.name === companyName);

        if(isSises.checked) {
            item.innerHTML = Math.round(CONVENTIONAL_UNIT * price.ratio_country[country.value]
                * (weight.value * price.ratio_weight)
                * (length.value * price.ratio_size)
                * (width.value * price.ratio_size)
                * (height.value * price.ratio_size));
        } else {
            item.innerHTML = Math.round(CONVENTIONAL_UNIT * price.ratio_country[country.value]
                * (weight.value * price.ratio_weight));
        }
    });

    [].forEach.call(termsItem, (item) => {
        const companyName = item.className.split('--')[1];
        const price = PRICES.find((companyPrice) => companyPrice.name === companyName);

        item.innerHTML = price.therms[country.value];
    })
};

document.querySelector('.weight-range').addEventListener('change', countWeight);
document.querySelector('.weight-range').addEventListener('input', countWeight);
document.querySelector('.weight-measure').addEventListener('change', countWeight);
document.querySelector('.size__checkbox').addEventListener('click', showSizeBox);
document.querySelector('.size__checkbox').addEventListener('click', countAll);
document.querySelector('.count-button').addEventListener('click', onSubmit);
document.querySelector('.address-country').addEventListener('change', countAll);
document.querySelector('.input-wrapper__input--phone').addEventListener('keyup', checkPhone);
[].forEach.call(document.querySelectorAll('.size-range'), (range) => {
    range.addEventListener('input', countSize);
    range.addEventListener('change', countSize);
});
[].forEach.call(document.querySelectorAll('.input-wrapper__input'), (input) => {
    input.setAttribute('correctly', 'false');
    input.addEventListener('input', checkInput);
    input.addEventListener('blur', removeHelp);
});

$.ajax({
    url: "prices.json",
    dataType: "json",
    success: (data) => {
        PRICES = data;
    }
});

$(($) => {
    $.mask.definitions['~']='[+-]';

    $('#phone').mask('(999) 999-99-99');
});

$(document).ready(() => {

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
    });
});
