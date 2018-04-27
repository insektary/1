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

const priceItems = $('.company-price__item');
const termsItem = $('.company-term__term');
const weight = $('.weight-range');
const length = $('.size-range__length');
const width = $('.size-range__width');
const height = $('.size-range__height');
const isSizes = $('.size__checkbox');
const country = $('.address-country');
const weightDisplay = $('.weight-value__value');
const sizeItems = $('.size-item');
const sizeBox = $('.size-box');
const countButton = $('.count-button');
const form = $('.control').get(0);
const measure = $('.weight-measure');
const regExps = {
    zip: /[0-9]{6}/,
    email: /^.+\@.{2,}\..{2,}$/i,
    phone: /^[- ()0-9]+$/,
    city: /^[а-яА-Я0-9]+$/,
    name: /^[а-яА-Я0-9]+$/,
    subname: /^[а-яА-Я0-9]+$/,
    fathername: /^[а-яА-Я0-9]+$/,
    street: /^[а-яА-Я0-9]+$/,
    build: /^[а-яА-Я0-9]+$/,
    flat: /^[а-яА-Я0-9]+$/
};
const RATIO_KG = 1;
const RATIO_LBS = 2.2;
const RANGE_DELAY = 500; //ms
const CONVENTIONAL_UNIT = 5;

let PRICES;
let TIMER;

const countWeight = () => {
    const ratio = (measure.attr('value') === 'kg') ? RATIO_KG : RATIO_LBS;

    weightDisplay.text(Math.round(weight.attr('value') * ratio * 100) / 100);

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
        sizeBox.css('display', 'flex');
    } else {
        sizeBox.css('display', 'none');
    }
};

const onSubmit = () => {
    const data = {};

    [].forEach.call(form.elements, ({ name, type, checked, value }) => {
        if (type === 'checkbox') {
            data[name] = checked;
        } else {
            data[name] = value;
        }
    });

    console.log(data);
};

const checkInput = (event) => {
    const target = $(event.target);
    const checkIsCorrect = regExps[target.attr('name')].test(target.attr('value'));
    const value = target.attr('value');

    if (value && checkIsCorrect) {
        target.attr('correctly', 'true').removeClass('input-wrapper__input--warning').addClass('input-wrapper__input--checked');

        removeHelp(event);
    } else if (value && !checkIsCorrect) {
        target.attr('correctly', 'false').addClass('input-wrapper__input--warning').siblings().css('display', 'block');
    } else {
        target.attr('correctly', 'false').addClass('input-wrapper__input--warning');

        removeHelp(event);
    }

    checkAll();
};

const removeHelp = ({ target }) => {
    $(target).siblings().css('display', 'none');
};

const checkAll = () => {
    if ([].some.call($('.input-wrapper__input'),
            (input) => input.getAttribute('correctly') === 'false')) {

        countButton.removeClass('count-button--enable').attr('disabled', 'disable');
    } else {
        countButton.addClass('count-button--enable').removeAttr('disabled');
    }

};

const countAll = () => {
    [].forEach.call(priceItems, (item) => {
        const companyName = item.className.split('--')[1];
        const price = PRICES.find((companyPrice) => companyPrice.name === companyName);

        if(isSizes.attr('checked')) {
            item.innerHTML = Math.round(CONVENTIONAL_UNIT * price.ratio_country[country.attr('value')]
                * (weight.attr('value') * price.ratio_weight)
                * (length.attr('value') * price.ratio_size)
                * (width.attr('value') * price.ratio_size)
                * (height.attr('value') * price.ratio_size));
        } else {
            item.innerHTML = Math.round(CONVENTIONAL_UNIT * price.ratio_country[country.attr('value')]
                * (weight.attr('value') * price.ratio_weight));
        }
    });

    [].forEach.call(termsItem, (item) => {
        const companyName = item.className.split('--')[1];
        const price = PRICES.find((companyPrice) => companyPrice.name === companyName);

        item.innerHTML = price.therms[country.attr('value')];
    })
};

weight.change(countWeight);
measure.change(countWeight);
isSizes.click(showSizeBox);
isSizes.click(countAll);
countButton.click(onSubmit);
country.change(countAll);
$('.size-range').change(countSize);
$('.input-wrapper__input').keyup(checkInput).blur(removeHelp).attr('correctly', 'false');

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
