import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../header.css';
import { GoogleLogin } from '@react-oauth/google';
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
import logout from '../assets/icons/logout.svg';
import logo from '../assets/icons/logo.svg';
import admin from '../assets/icons/admin.svg';
import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'http://localhost:5000';

const Header = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [profile, setProfile] = useState({});
    const [balance, setBalance] = useState(0);
    const [randomItems, setRandomItems] = useState([]);
    const isAdmin = profile.googleId === '110140695950508222428';

    useEffect(() => {
        const storedProfile = Cookies.get('userProfile');
        if (storedProfile) {
            setProfile(JSON.parse(storedProfile));
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        fetchRandomItems();
        const interval = setInterval(fetchRandomItems, 4000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const fetchRandomItems = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/item/items`);
            const shuffledItems = shuffleArray(response.data);
            const slicedItems = shuffledItems.slice(0, 10); // Изменено на 10 элементов
            setRandomItems(slicedItems);
        } catch (error) {
            console.error('Ошибка при загрузке случайных предметов:', error);
        }
    };

    const shuffleArray = (array) => {
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };

    const fetchUserProfile = async (response) => {
        try {
            const idToken = response.credential;
            const res = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`);
            const data = await res.json();

            const userResponse = await fetch('/api/user/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    googleId: data.sub,
                    email: data.email,
                    name: data.name,
                    picture: data.picture
                })
            });

            setProfile({
                googleId: data.sub,
                email: data.email,
                name: data.name,
                picture: data.picture
            });
            Cookies.set('userProfile', JSON.stringify({
                googleId: data.sub,
                email: data.email,
                name: data.name,
                picture: data.picture
            }), { expires: 7 });
            setIsAuthenticated(true);
            closeModal();
        } catch (error) {
            console.error('Failed to fetch user profile', error);
        }
    };

    const fetchUserBalance = async () => {
        if (!profile.googleId) {
            console.error('No googleId found');
            return;
        }
        try {
            const response = await fetch(`/api/user/balance?googleId=${profile.googleId}`);
            const data = await response.json();
            if (data.balance !== undefined) {
                setBalance(data.balance);
            }
        } catch (error) {
            console.error('Failed to fetch user balance', error);
        }
    };

    useEffect(() => {
        if (profile.googleId) {
            fetchUserBalance();
        }
    }, [profile.googleId]);

    const handleLogout = () => {
        setIsAuthenticated(false);
        setProfile({});
        Cookies.remove('userProfile');
        navigate('/');
    };

    const menuItems = [
        { text: 'кейсы', href: '/create-case', icon: caseIcon1 },
        { text: 'апгрейд', href: '/create-item', icon: upgrade },
        { text: 'контракты', href: '#', icon: contract }
    ];

    if (isAdmin) {
        menuItems.push({ text: 'Админ-панель', href: '/admin-panel', icon: admin });
    }

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <div>
            <header className="header">
                <div className="container">
                    <div className="header-inner">
                        <div className="small-logo-wrapper">
                            <img src={smallLogo} alt="SmallLogo" className="small-logo" />
                        </div>

                        <div className="logo-menu-wrapper">
                            <div className="logo-wrapper">
                                <a href="/" className="logo-link">
                                    <div className="logo-large">
                                        <img src={logo} alt="MiniLogo" className="big-logo" />
                                    </div>
                                </a>
                            </div>
                            <nav className={`menu ${menuOpen ? 'menu-open' : ''}`}>
                                {menuItems.map((item, index) => (
                                    <span key={index} className="menu-item">
                                        <a href={item.href} className="menu-link">
                                            <img src={item.icon} alt={item.text} className="menu-icon" />
                                            {item.text}
                                        </a>
                                    </span>
                                ))}
                            </nav>
                            <button className="menu-toggle" onClick={toggleMenu}>
                                <img src={menuIcon} alt="Menu" className="menu-icon-svg" />
                            </button>
                        </div>

                        <div className="login-button-wrapper">
                            {isAuthenticated ? (
                                <div className="profile-greeting">
                                    <span className="balance-container">
                                        <span className="balance-text">€ {balance.toFixed(2)}</span>
                                    </span>
                                    <span className="greeting-text"
                                          onClick={() => navigate('/profile', { state: { profile } })}>
                                        {profile.name}!
                                    </span>
                                    <img src={logout} alt="Logout" className="logout" onClick={handleLogout} />
                                </div>
                            ) : (
                                <button className="login-button" onClick={openModal}>
                                    <img src={sign} alt="Sign" className="sign.svg" />
                                    <span className="login-button-text">Вход</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <GoogleLogin
                    onSuccess={(response) => {
                        console.log('Custom Google login successful', response);
                        fetchUserProfile(response);
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
                                {randomItems.map((item, index) => (
                                    <div className={`colored-section ${getRarityClass(item.rarity)}`} key={index}>
                                        <img src={item.itemImageUrl} alt={`Random Item ${index + 1}`} className="overlay-image" />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

const getRarityClass = (rarity) => {
    switch (rarity) {
        case 'Common':
            return 'common';
        case 'Rare':
            return 'rare red';
        case 'Epic':
            return 'epic';
        default:
            return '';
    }
};

export default Header;
