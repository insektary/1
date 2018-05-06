const removeHelp = ({ target }) => {
    $(target).siblings().css('display', 'none');
};

const displayResult = (target, result) => {
    target.innerHTML = result;
};

window.displayResult = displayResult;
window.removeHelp = removeHelp;