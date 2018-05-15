const $sizeBox = $('.size-box');
const $weightDisplay = $('.weight-value__value');

const INPUT_CLASS_WARNING = 'input-wrapper__input--warning';
const INPUT_CLASS_CHECKED = 'input-wrapper__input--checked';

const removeHelp = ({ target }) => {
    $(target).siblings().css('display', 'none');
};

const displayResult = (target, result) => {
    target.innerHTML = result;
};

const showSizeBox = ({ target: { checked } }) => {
    if (checked) {
        $sizeBox.css('display', 'flex');
    } else {
        $sizeBox.css('display', 'none');
    }
};

const displayWeight = (value) => {
    $weightDisplay.text(value);
};

const checkFieldAsCorrect = (field) => {
    field.removeClass(INPUT_CLASS_WARNING).addClass(INPUT_CLASS_CHECKED);
};

const checkFieldAsWrong = (field) => {
    field.toggleClass(INPUT_CLASS_WARNING, true).siblings().css('display', 'block');
};

const checkFieldAsEmpty = (field) => {
    field.toggleClass(INPUT_CLASS_WARNING, true);
};

module.exports = {
    removeHelp,
    displayResult,
    showSizeBox,
    displayWeight,
    checkFieldAsCorrect,
    checkFieldAsWrong,
    checkFieldAsEmpty
};
