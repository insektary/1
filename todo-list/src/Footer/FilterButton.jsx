import React from 'react';
import './footer.less';
import CONST from '../Constants';

const FilterButton = ({ id, changeFilter, content, chosenFilter }) => (
    <button
        id={ id } onClick={ changeFilter }
        className={ (chosenFilter === id) ? CONST.BUTTON_ACTIVE : CONST.BUTTON_CLASSNAME }
    >{ content }</button>
);

export default FilterButton;