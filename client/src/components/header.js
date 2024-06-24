import React, {useState} from 'react';
import '../header.css';
import {GoogleLogin} from '@react-oauth/google';
import Modal from './Modal';

import caseIcon1 from '../assets/icons/case.svg';
import upgrade from '../assets/icons/upgrade.svg';
import contract from '../assets/icons/contract.svg';
import wifi from '../assets/icons/wifi.svg';
import crown from '../assets/icons/crown.svg';
import cube from '../assets/icons/cube.svg';
import menuIcon from '../assets/icons/menu.svg';
import smallLogo from '../assets/icons/iconBg.svg';
import sign from '../assets/icons/sign.svg';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const menuItems = [
        {text: 'кейсы', href: '#', icon: caseIcon1},
        {text: 'апгрейд', href: '#', icon: upgrade},
        {text: 'контракты', href: '#', icon: contract}
    ];

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };


    const imagePaths = [
        'https://community.akamai.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835dX52LNfDY0jhyo8DEiv5dYOaw7rLczQfG2JulcKTk/360fx360f',
        'https://steamcommunity-a.akamaihd.net/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Je5WHNfDY0jhyo8DEiv5dYO607rLc2Rv2_pCV1NYc',
        'https://community.akamai.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff52LHfDY0jhyo8DEiv5dQOKo7rbw3Q_ndKTc8eQ/360fx360f',
        'https://steamuserimages-a.akamaihd.net/ugc/1844802808246288843/666C70735165C0F9B434C0F7323A2C93714C03B4/',
        'https://chicks-products.s3.amazonaws.com/2a841f71-89bc-4da7-8326-fefb8fb2ff0e',
        'https://steamcommunity-a.akamaihd.net/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Je5mPFfDY0jhyo8DEiv5dYPKA7rrY0Rv64OZ_IjGA',
        'https://steamcommunity-a.akamaihd.net/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835dc5WLBfDY0jhyo8DEiv5daOK46rbczQfC_7rW9mjs',
        'https://files.facepunch.com/rust/item/rifle.lr300_512.png',
        'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJfwOfBfThW-NOJlZG0hOPxNrfunWVY7sBOguzA45W72wXn-ENtMjinIICTJwM6YV3W-Vi9k73mhZW16p3NzHRnsyNzsHrdmgv3309CdQ48_A',
        'https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou7uifDhzw8zAcCdD_tiJlpKKgfjLP7LWnn8fvZR30r2SpY3wiQDiqks6amqmIYaRJFQ3NAnZ_1Htlenoh5-_vMnPnWwj5HeouX7iBw',
    ];

    const coloredSections = imagePaths.map((imageSrc, i) => (
        <div className="colored-section" key={i}>
            <img src={imageSrc} alt={`Section ${i + 1}`} className="overlay-image"/>
        </div>
    ));

    return (
        <div>
            <header className="header">
                <div className="container">
                    <div className="header-inner">
                        <div className="small-logo-wrapper">
                            <img src={smallLogo} alt="SmallLogo" className="small-logo"/>
                        </div>

                        <div className="logo-menu-wrapper">
                            <div className="logo-wrapper">
                                <a href="/" className="logo-link">
                                    <div className="logo-large">
                                        <img src="https://rustbox.io/assets/icons/logo.svg" alt="Logo"
                                             className="large-logo"/>
                                        <img src={smallLogo} alt="MiniLogo"
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
                            <button className="login-button" onClick={openModal}>
                                <img src={sign} alt="Sign" className="sign.svg"/>
                                <span className="login-button-text">Вход</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>


                <Modal isOpen={isModalOpen} onClose={closeModal}>
                <hr/>
                <GoogleLogin
                    onSuccess={(response) => {
                        console.log('Custom Google login successful', response);
                    }}
                    onError={() => {
                        console.error('Custom Google login failed');
                    }}
                    theme="outline"
                    size="large"
                    text="continue_with"
                />
            </Modal>


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
