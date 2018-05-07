const removeHelp = ({ target }) => {
    $(target).siblings().css('display', 'none');
};

const displayResult = (target, result) => {
    target.innerHTML = result;
};

module.exports = { removeHelp, displayResult };
