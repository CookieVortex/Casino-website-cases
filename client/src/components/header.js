import React from 'react';
import '../header.css';

const Header = () => {
    const menuItems = [
        {text: 'кейсы', href: '#'},
        {text: 'апргрейд', href: '#'},
        {text: 'контракты', href: '#'}
    ];

    return (
        <header className="header">
            <div className="container">
                <div className="header-inner">
                    <div className="logo-wrapper">
                        <a href="/" className="logo-link">
                            <div className="logo-large"><img src="https://rustbox.io/assets/icons/logo.svg"
                                                             alt="Логотип"/></div>
                        </a>
                    </div>
                    <nav className="menu">
                        {menuItems.map((item, index) => (
                            <span key={index} className="menu-item">
                                <a href={item.href} className="menu-link">
                                    {item.text}
                                </a>
                            </span>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
