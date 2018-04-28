'use strict';

require('./libs/jquery.js');
require('./libs/jquery.maskedinput-1.2.2.js');
require('./libs/jquery.autocomplete.js');
require("babel-polyfill");

const $priceItems = $('.company-price__item');
const $termsItem = $('.company-term__term');
const $weight = $('.weight-range');
const $length = $('.size-range__length');
const $width = $('.size-range__width');
const $height = $('.size-range__height');
const $isSizes = $('.size__checkbox');
const $country = $('.address-country');
const $weightDisplay = $('.weight-value__value');
const $sizeItems = $('.size-item');
const $sizeBox = $('.size-box');
const $countButton = $('.count-button');
const $measure = $('.weight-measure');
const form = $('.control').get(0);
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
const IS_KG = 'kg';
const RATIO_LBS = 2.2;
const RANGE_DELAY = 500; //ms
const CONVENTIONAL_UNIT = 5;
const ROUND_RATIO = 100;
const CHECKBOX = 'checkbox';

let prices;
let timer;

const countWeight = () => {
    const ratio = ($measure.val() === IS_KG) ? RATIO_KG : RATIO_LBS;

    $weightDisplay.text(Math.round($weight.val() * ratio * ROUND_RATIO) / ROUND_RATIO);

    checkTimer();
};

const checkTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }

    timer = setTimeout(countAll, RANGE_DELAY);
};

const countSize = ({ target }) => {
    const measureClass = target.className.split('__')[1];

    [].forEach.call($sizeItems, (item) => {
        if (item.className.split('--')[1] === measureClass) {
            item.innerHTML = target.value;
        }
    });

    checkTimer();
};

const showSizeBox = ({ target: { checked } }) => {
    if (checked) {
        $sizeBox.css('display', 'flex');
    } else {
        $sizeBox.css('display', 'none');
    }
};

const onSubmit = () => {
    const data = {};

    [].forEach.call(form.elements, ({ name, type, checked, value }) => {
        if (type === CHECKBOX) {
            data[name] = checked;
        } else {
            data[name] = value;
        }
    });
};

const checkInput = (event) => {
    const $target = $(event.target);
    const checkIsCorrect = regExps[$target.attr('name')].test($target.val());
    const value = $target.val();

    if (value && checkIsCorrect) {
        $target.attr('correctly', 'true').removeClass('input-wrapper__input--warning').addClass('input-wrapper__input--checked');

        removeHelp(event);
    } else if (value && !checkIsCorrect) {
        $target.attr('correctly', 'false').toggleClass('input-wrapper__input--warning', true).siblings().css('display', 'block');
    } else {
        $target.attr('correctly', 'false').toggleClass('input-wrapper__input--warning', true);

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

        $countButton.removeClass('count-button--enable').attr('disabled', 'disable');
    } else {
        $countButton.addClass('count-button--enable').removeAttr('disabled');
    }

};

const countAll = () => {
    $priceItems.each((index, item) => {
        const companyName = item.className.split('--')[1];
        const price = prices.find(({ name }) => name === companyName);

        if($isSizes.attr('checked')) {
            item.innerHTML = Math.round(CONVENTIONAL_UNIT * price.ratio_country[$country.val()]
                * ($weight.val() * price.ratio_weight)
                * ($length.val() * price.ratio_size)
                * ($width.val() * price.ratio_size)
                * ($height.val() * price.ratio_size));
        } else {
            item.innerHTML = Math.round(CONVENTIONAL_UNIT * price.ratio_country[$country.val()]
                * ($weight.val() * price.ratio_weight));
        }
    });

    [].forEach.call($termsItem, (item) => {
        const companyName = item.className.split('--')[1];
        const price = prices.find((companyPrice) => companyPrice.name === companyName);

        item.innerHTML = price.therms[$country.val()];
    })
};

$weight.change(countWeight);
$measure.change(countWeight);
$isSizes.click(showSizeBox);
$isSizes.click(countAll);
$countButton.click(onSubmit);
$country.change(countAll);
$('.size-range').change(countSize);
$('.input-wrapper__input').keyup(checkInput).blur(removeHelp).attr('correctly', 'false');

$.ajax({
    url: 'prices.json',
    dataType: 'json',
    success: (data) => {
        prices = data;
    }
});

$.ajax({
    url: 'supported_cities.json',
    dataType: 'json',
    success: (supportedCities) => {
        $(document).ready(() => {

            $('#city').autocompleteArray(supportedCities,
                {
                    delay: 10,
                    minChars: 1,
                    matchSubset: 1,
                    autoFill: true,
                    maxItemsToShow: 10
                });
        });
    }
});

$(($) => {
    $.mask.definitions['~']='[+-]';

    $('#phone').mask('(999) 999-99-99');
});
