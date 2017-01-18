import React from 'react';

export default function Header(){
    return (
        <div className="header">
            <ul className="header__menu">
                <li className="header__menu-item">
                    <a className="header__menu-link" href="/">Home</a>
                </li>
                <li className="header__menu-item">
                    <a className="header__menu-link" href="/articles?tags=politics">Politics</a>
                </li>
                <li className="header__menu-item">
                    <a className="header__menu-link" href="/articles?tags=economy">Economy</a>
                </li>
                <li className="header__menu-item">
                    <a className="header__menu-link" href="/articles?tags=sports">Sports</a>
                </li>
                <li className="header__menu-item">
                    <a className="header__menu-link" href="/articles?tags=art">Art</a>
                </li>                        
                <li className="header__menu-item">
                    <a className="header__menu-link" href="/articles?tags=entertainment">Entertainment</a>
                </li>
            </ul>
        </div>
    );
}