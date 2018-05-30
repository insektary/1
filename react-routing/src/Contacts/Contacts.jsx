import React from 'react';
import './Contacts.less';
import { CSS } from '../CONST';

const { CONTACTS, ADDRESS, PHONE, EMAIL } = CSS;

const Contacts = () => (
    <div className={ CONTACTS.CONTAINER }>
        <div className={ CONTACTS.TITLE }>
            Contacts:
        </div>
        <div className={ CONTACTS.CONTENT }>
            <div className={ ADDRESS.CONTAINER }>
                <span className={ ADDRESS.TITLE }>&#9978; Address:</span>
                <div className={ ADDRESS.CONTENT }>390017, Россия, г. Рязань, Ряжское шоссе, 19</div>
            </div>
            <div className={ PHONE.CONTAINER }>
                <span className={ PHONE.ITEM }>&#9742; Phone:</span>
                <ul className={ PHONE.LIST }>
                    <li className={ PHONE.ITEM }>8-364-57-32-43</li>
                    <li className={ PHONE.ITEM }>8-354-34-23-76</li>
                </ul>
            </div>
            <div className={ EMAIL.CONTAINER }>
                <span className={ EMAIL.TITLE }>&#128386; Email:</span>
                <div className={ EMAIL.CONTENT }>example_address@mail.ru</div>
            </div>
        </div>
    </div>
)

export default Contacts;