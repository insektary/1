const $priceItems = $('.company-price__item');
const $termsItem = $('.company-term__term');
const $length = $('.size-range__length');
const $width = $('.size-range__width');
const $height = $('.size-range__height');
const $weightDisplay = $('.weight-value__value');
const $sizeItems = $('.size-item');
const $sizeBox = $('.size-box');
const $measure = $('.weight-measure');
const $weight = $('.weight-range');
const $country = $('.address-country');
const $countButton = $('.count-button');
const $isSizes = $('.size__checkbox');
const form = $('.control');
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

let timer;
let prices;

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

    $sizeItems.each((index, item) => {
        if (item.className.split('--')[1] === measureClass) {
            displayResult(item, target.value);
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
    const data = form.serializeArray();

    data.checked = $isSizes.attr('checked');
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
            displayResult(item, Math.round(CONVENTIONAL_UNIT * price.ratio_country[$country.val()]
                * ($weight.val() * price.ratio_weight)
                * ($length.val() * price.ratio_size)
                * ($width.val() * price.ratio_size)
                * ($height.val() * price.ratio_size)));
        } else {
            displayResult(item, Math.round(CONVENTIONAL_UNIT * price.ratio_country[$country.val()]
                * ($weight.val() * price.ratio_weight)));
        }
    });

    $termsItem.each((index, item) => {
        const companyName = item.className.split('--')[1];
        const price = prices.find((companyPrice) => companyPrice.name === companyName);

        displayResult(item, price.therms[$country.val()]);
    })
};

$.ajax({
    url: 'prices.json',
    dataType: 'json',
    success: (data) => {
        prices = data;
    }
});

window.countWeight = countWeight;
window.checkTimer = checkTimer;
window.countSize = countSize;
window.showSizeBox = showSizeBox;
window.onSubmit = onSubmit;
window.checkInput = checkInput;
window.checkAll = checkAll;
window.countAll = countAll;