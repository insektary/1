const display = require('./display.js');

const $priceItems = $('.company-price__item');
const $termsItem = $('.company-term__term');
const $length = $('.size-range__length');
const $width = $('.size-range__width');
const $height = $('.size-range__height');
const $sizeItems = $('.size-item');
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
    subname: /^[-а-яА-Я0-9]+$/,
    fathername: /^[а-яА-Я0-9]+$/,
    street: /^[- а-яА-Я0-9]+$/,
    build: /^[а-яА-Я0-9]+$/,
    flat: /^[а-яА-Я0-9]+$/
};

const RATIO_KG = 1;
const IS_KG = 'kg';
const RATIO_LBS = 2.2;
const RANGE_DELAY = 500; //ms
const CONVENTIONAL_UNIT = 5;
const ROUND_RATIO = 100;
const BUTTON_ENABLE = 'count-button--enable';

let timer;
let prices;

const countWeight = () => {
    const ratio = ($measure.val() === IS_KG) ? RATIO_KG : RATIO_LBS;

    display.displayWeight(Math.round($weight.val() * ratio * ROUND_RATIO) / ROUND_RATIO);
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
            display.displayResult(item, target.value);
        }
    });

    checkTimer();
};

const onSubmit = () => {
    const data = form.serializeArray();

    data.checked = $isSizes.attr('checked');
};

const checkInput = (event) => {
    const $target = $(event.target);
    const value = $target.val();
    const checkIsCorrect = regExps[$target.attr('name')].test(value.trim());

    if (value && checkIsCorrect) {
        $target.attr('correctly', 'true');

        display.checkFieldAsCorrect($target);
        display.removeHelp(event);
    } else if (value && !checkIsCorrect) {
        $target.attr('correctly', 'false');

        display.checkFieldAsWrong($target);
    } else {
        $target.attr('correctly', 'false');

        display.checkFieldAsEmpty($target);
        display.removeHelp(event);
    }

    checkAll();
};

const checkFunction = function() {
    return (this.getAttribute('correctly') === 'false');
};

const checkAll = () => {
    if ($('.input-wrapper__input').is(checkFunction)) {
        $countButton.removeClass(BUTTON_ENABLE);
        $countButton.attr('disabled', 'disable');
    } else {
        $countButton.addClass(BUTTON_ENABLE);
        $countButton.removeAttr('disabled');
    }
};

const countAll = () => {
    $priceItems.each((index, item) => {
        const companyName = item.className.split('--')[1];
        const price = prices.find(({ name }) => name === companyName);

        if($isSizes.attr('checked')) {
            display.displayResult(item, Math.round(CONVENTIONAL_UNIT * price.ratio_country[$country.val()]
                * ($weight.val() * price.ratio_weight)
                * ($length.val() * price.ratio_size)
                * ($width.val() * price.ratio_size)
                * ($height.val() * price.ratio_size)));
        } else {
            display.displayResult(item, Math.round(CONVENTIONAL_UNIT * price.ratio_country[$country.val()]
                * ($weight.val() * price.ratio_weight)));
        }
    });

    $termsItem.each((index, item) => {
        const companyName = item.className.split('--')[1];
        const price = prices.find((companyPrice) => companyPrice.name === companyName);

        display.displayResult(item, price.terms[$country.val()]);
    })
};

$.ajax({
    url: 'prices.json',
    dataType: 'json',
    success: (data) => {
        prices = data;
    }
});

$weight.change(countWeight);
$measure.change(countWeight);
$isSizes.click(countAll);
$countButton.click(onSubmit);
$country.change(countAll);
$isSizes.click(display.showSizeBox);
$('.size-range').change(countSize);
$('.input-wrapper__input').keyup(checkInput).blur(display.removeHelp).attr('correctly', 'false');
