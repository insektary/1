import React from 'react';
import './Contacts.less';
import { CSS } from '../CONST';

const Contacts = () => {
    return(
        <div className={ CSS.CONTACTS }>
            <div className={ CSS.CONTACTS_TITLE }>
                Contacts:
            </div>
            <div className={ CSS.CONTACTS_CONTENT }>
                <div className={ CSS.ADDRESS }>
                    <span className={ CSS.ADDRESS_TITLE }>&#9978; Address:</span>
                    <div className={ CSS.ADDRESS_CONTENT }>390017, Россия, г. Рязань, Ряжское шоссе, 19</div>
                </div>
                <div className={ CSS.PHONE }>
                    <span className={ CSS.PHONE_ITEM }>&#9742; Phone:</span>
                    <ul className={ CSS.PHONE_LIST }>
                        <li className={ CSS.PHONE_ITEM }>8-364-57-32-43</li>
                        <li className={ CSS.PHONE_ITEM }>8-354-34-23-76</li>
                    </ul>
                </div>
                <div className={ CSS.EMAIL }>
                    <span className={ CSS.EMAIL_TITLE }>&#128386; Email:</span>
                    <div className={ CSS.EMAIL_CONTENT }>example_address@mail.ru</div>
                </div>
            </div>
        </div>
    )
};

export default Contacts;