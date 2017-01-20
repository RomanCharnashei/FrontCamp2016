import React from 'react';
import { IndexLink, Link } from 'react-router';

export default function Header(){
    return (
        <div className="header">
            <ul className="header__menu">
                <li className="header__menu-item">
                    <IndexLink className="header__menu-link" to="/">Home</IndexLink>
                </li>
                <li className="header__menu-item">
                    <Link className="header__menu-link" to={{ pathname: 'articles', query: { tags: 'politics' } }}>Politics</Link>
                </li>
                <li className="header__menu-item">
                    <Link className="header__menu-link" to={{ pathname: 'articles', query: { tags: 'economy' } }}>Economy</Link>
                </li>
                <li className="header__menu-item">
                    <Link className="header__menu-link" to={{ pathname: 'articles', query: { tags: 'sports' } }}>Sports</Link>
                </li>
                <li className="header__menu-item">
                    <Link className="header__menu-link" to={{ pathname: 'articles', query: { tags: 'art' } }}>Art</Link>
                </li>                        
                <li className="header__menu-item">
                    <Link className="header__menu-link" to={{ pathname: 'articles', query: { tags: 'entertainment' } }}>Entertainment</Link>
                </li>
            </ul>
        </div>
    );
}