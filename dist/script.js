const weight = document.querySelector('.weight-value__value');
const sizeItems = document.querySelectorAll('.size-item');
const sizeBox = document.querySelector('.size-box');

const countWeight = () => {
    const value = document.querySelector('.weight-range').value;
    const measure = document.querySelector('.weight-measure').value;
    const ratio = (measure === 'kg') ? 1 : 2.2;

    weight.innerHTML = Math.round(value * ratio * 100) / 100;
};

const countSize = ({ target }) => {
    const measureClass = target.className.split('__')[1];

    sizeItems.forEach((item) => {
        if (item.className.split('--')[1] === measureClass) {
            item.innerHTML = target.value;
        }
    })
};

const showSizeBox = ({ target }) => {
    if (target.checked) {
        sizeBox.style.display = 'flex';
    } else {
        sizeBox.style.display = 'none';
    }
};

const onSubmit = () => {
    console.log('submit!');
};

document.querySelector('.weight-range').addEventListener('input', countWeight);
document.querySelector('.weight-measure').addEventListener('change', countWeight);
document.querySelector('.size__checkbox').addEventListener('click', showSizeBox);
document.querySelector('.control').addEventListener('submit', onSubmit);
document.querySelectorAll('.size-range').forEach((range) => {
    range.addEventListener('input', countSize)
});