'use strict';

require('./libs/jquery.js');
require('./libs/jquery.maskedinput-1.2.2.js');
require('./libs/jquery.autocomplete.js');
require("babel-polyfill");
const logic = require('./logic.js');

$('.size-range').change(logic.countSize);

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
