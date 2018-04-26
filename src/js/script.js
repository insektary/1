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

const weight = document.querySelector('.weight-value__value');
const sizeItems = document.querySelectorAll('.size-item');
const sizeBox = document.querySelector('.size-box');
const countButton = document.querySelector('.count-button');
const regExps = {
    zip: /[0-9]{6}/,
    ru: /^[а-яА-Я]+$/,
    email: /^.+\@.{2,}\..{2,}$/i,
    default: /^[а-яА-Я0-9]+$/
};
const RATIO_KG = 1;
const RATIO_LBS = 2.2;
const RANGE_DELAY = 500; //ms
const CONVENTIONAL_UNIT = 5;

let PRICES;
let TIMER;

const countWeight = () => {
    const weightValue = document.querySelector('.weight-range').value;
    const measure = document.querySelector('.weight-measure').value;
    const ratio = (measure === 'kg') ? RATIO_KG : RATIO_LBS;

    weight.innerHTML = Math.round(weightValue * ratio * 100) / 100;

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

    TIMER = setTimeout(countAll, RANGE_DELAYS);
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
    const helpContent = parentNode.querySelector('.input-wrapper__help');
    const helpArrow = parentNode.querySelector('.input-wrapper__arrow');

    helpContent.style.display = 'block';
    helpArrow.style.display = 'block';
};

const checkPhone = () => {
    const inputPhone = document.querySelector('.input-wrapper__input--phone');

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

    [].forEach.call(priceItems, (item) => {
        const companyName = item.className.split('--')[1];
        const price = PRICES.find((companyPrice) => companyPrice.name === companyName);

        if(isSises) {
            item.innerHTML = Math.round(CONVENTIONAL_UNIT * price.ratio_country[country]
                * (weightValue * price.ratio_weight)
                * (lengthValue * price.ratio_size)
                * (widthValue * price.ratio_size)
                * (heightValue * price.ratio_size));
        } else {
            item.innerHTML = Math.round(CONVENTIONAL_UNIT * price.ratio_country[country]
                * (weightValue * price.ratio_weight));
        }
    });

    [].forEach.call(termsItem, (item) => {
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
