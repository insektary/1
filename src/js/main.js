'use strict';

require('./libs/jquery.js');
require('./libs/jquery.maskedinput-1.2.2.js');
require('./libs/jquery.autocomplete.js');
require('./display.js');
require('./logic.js');
require("babel-polyfill");

const $weight = $('.weight-range');
const $isSizes = $('.size__checkbox');
const $country = $('.address-country');
const $countButton = $('.count-button');
const $measure = $('.weight-measure');

$weight.change(countWeight);
$measure.change(countWeight);
$isSizes.click(showSizeBox);
$isSizes.click(countAll);
$countButton.click(onSubmit);
$country.change(countAll);
$('.size-range').change(countSize);
$('.input-wrapper__input').keyup(checkInput).blur(removeHelp).attr('correctly', 'false');

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
