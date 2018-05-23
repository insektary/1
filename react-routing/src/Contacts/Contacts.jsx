import React from 'react';
import './Contacts.less';

const Contacts = () => {
    return(
        <div className="contacts">
            <div className="contacts__title">
                Contacts:
            </div>
            <div className="contacts__content">
                <div className="address">
                    <span className="address__title">&#9978; Address:</span>
                    <div className="address__content">390017, Россия, г. Рязань, Ряжское шоссе, 19</div>
                </div>
                <div className="phone">
                    <span className="phone__title">&#9742; Phone:</span>
                    <ul className="phone__list">
                        <li className="phone__item">8-364-57-32-43</li>
                        <li className="phone__item">8-354-34-23-76</li>
                    </ul>
                </div>
                <div className="email">
                    <span className="email__title">&#128386; Email:</span>
                    <div className="email__content">example_address@mail.ru</div>
                </div>
            </div>
        </div>
    )
};

export default Contacts;