import React from 'react';
import './footer.less';
import { CSS } from '../Constants';

const FilterButton = ({ id, changeFilter, content, chosenFilter }) => (
    <button
        id={ id } onClick={ changeFilter }
        className={ (chosenFilter === id) ? CSS.BUTTON_ACTIVE : CSS.BUTTON }
    >{ content }</button>
);

export default FilterButton;