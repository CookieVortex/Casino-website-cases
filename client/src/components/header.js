import React, { useState } from 'react';
import '../header.css';

import caseIcon1 from '../assets/icons/case.svg';
import upgrade from '../assets/icons/upgrade.svg';
import contract from '../assets/icons/contract.svg';
import sign from '../assets/icons/sign.svg';
import wifi from '../assets/icons/wifi.svg';
import crown from '../assets/icons/crown.svg';
import cube from '../assets/icons/cube.svg';
import menuIcon from '../assets/icons/menu.svg';
import smallLogo from '../assets/icons/iconBg.svg';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const menuItems = [
        { text: 'кейсы', href: '#', icon: caseIcon1 },
        { text: 'апгрейд', href: '#', icon: upgrade },
        { text: 'контракты', href: '#', icon: contract }
    ];

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const coloredSections = Array.from({ length: 10 }, (v, i) => (
        <div className="colored-section" key={i}></div>
    ));

    return (
        <div>
            <header className="header">
                <div className="container">
                    <div className="header-inner">
                        <div className="small-logo-wrapper">
                            <img src={smallLogo} alt="Маленький логотип" className="small-logo"/>
                        </div>

                        <div className="logo-menu-wrapper">
                            <div className="logo-wrapper">
                                <a href="/" className="logo-link">
                                    <div className="logo-large">
                                        <img src="https://rustbox.io/assets/icons/logo.svg" alt="Логотип"
                                             className="large-logo"/>
                                        <img src={smallLogo} alt="Маленький логотип"
                                             className="small-logo-in-responsive"/>
                                    </div>
                                </a>
                            </div>
                            <nav className={`menu ${menuOpen ? 'menu-open' : ''}`}>
                                {menuItems.map((item, index) => (
                                    <span key={index} className="menu-item">
                                        <a href={item.href} className="menu-link">
                                            <img src={item.icon} alt={item.text} className="menu-icon"/>
                                            {item.text}
                                        </a>
                                    </span>
                                ))}
                            </nav>
                            <button className="menu-toggle" onClick={toggleMenu}>
                                <img src={menuIcon} alt="Menu" className="menu-icon-svg"/>
                            </button>
                        </div>
                        <div className="login-button-wrapper">
                            <button className="login-button">
                                <img src={sign} alt="Steam" className="login-button-icon"/>
                                <span className="login-button-text">Войти</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="block-wrapper">
                <div className="container">
                    <div className="blocks-container">

                        <div className="block first-section">
                            <div className="wifi-icon-wrapper">
                                <img src={wifi} alt="Wifi" className="wifi-button-icon"/>
                            </div>
                            <span className="wifi-count">1</span>
                            <span className="wifi-online">online</span>
                        </div>

                        <div className="block vertical-sections">
                            <div className="second-section">
                                <img src={crown} alt="Crown" className="crown-icon"/>
                            </div>
                            <div className="third-section">
                                <img src={cube} alt="Cube" className="cube-icon"/>
                            </div>
                        </div>

                        <div className="block right-block">
                            <div className="colored-sections">
                                {coloredSections}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Header;
