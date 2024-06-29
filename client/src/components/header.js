import React, { useState, useEffect } from 'react';
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

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [profile, setProfile] = useState({});
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        if (profile.googleId) {
            fetchUserBalance();
        }
    }, [profile]);

    const fetchUserProfile = async (response) => {
        try {
            const idToken = response.credential;

            const res = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`);
            const data = await res.json();
            console.log('Fetched user profile:', data);

            const userResponse = await fetch('/api/user/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    googleId: data.sub,
                    email: data.email,
                    name: data.name
                })
            });

            const userResult = await userResponse.json();
            console.log(userResult.message);

            setProfile(data);
            setIsAuthenticated(true);
            closeModal();
        } catch (error) {
            console.error('Failed to fetch user profile', error);
        }
    };

    const fetchUserBalance = async () => {
        try {
            console.log('Fetching user balance for googleId:', profile.googleId);

            const response = await fetch(`/api/user/balance?googleId=${profile.googleId}`);
            const data = await response.json();
            console.log('Fetched user balance:', data);

            if (data.balance !== undefined) {
                setBalance(data.balance); // Обновляем состояние баланса на фронтенде
            }
        } catch (error) {
            console.error('Failed to fetch user balance', error);
        }
    };

    const updateBalance = async (newBalance) => {
        try {
            const response = await fetch('/api/user/update-balance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ googleId: profile.googleId, balance: newBalance })
            });

            const data = await response.json();
            console.log('Balance updated:', data);

            if (data.balance !== undefined) {
                setBalance(data.balance); // Обновляем состояние баланса после изменения на сервере
            }
        } catch (error) {
            console.error('Failed to update balance', error);
        }
    };

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = () => {
        setIsAuthenticated(false);
        setProfile({ name: '' });
        setShowLogoutModal(false);
    };

    const cancelLogout = () => {
        setShowLogoutModal(false);
    };

    const menuItems = [
        { text: 'кейсы', href: '#', icon: caseIcon1 },
        { text: 'апгрейд', href: '#', icon: upgrade },
        { text: 'контракты', href: '#', icon: contract }
    ];

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const imagePaths = [
        'https://i.ibb.co/yNRn4sK/image1.jpg',
        'https://i.ibb.co/Wt2TLjV/image2.jpg',
        'https://i.ibb.co/y0YNT9R/image3.jpg',
        'https://i.ibb.co/cg1GZfq/image4.jpg',
        'https://i.ibb.co/BN6f4zY/image5.jpg',
        'https://i.ibb.co/xJXPdm7/image6.jpg',
        'https://i.ibb.co/B4H0K6Y/image7.jpg',
        'https://i.ibb.co/xgccfJv/image8.jpg',
        'https://i.ibb.co/YZB9mbG/image9.jpg',
        'https://i.ibb.co/9rLDhz3/image10.jpg'
    ];

    const coloredSections = imagePaths.map((imageSrc, i) => (
        <div className="colored-section" key={i}>
            <img src={imageSrc} alt={`Section ${i + 1}`} className="overlay-image" />
        </div>
    ));

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
                                        <img src="https://rustbox.io/assets/icons/logo.svg" alt="Logo" className="large-logo" />
                                        <img src={smallLogo} alt="MiniLogo" className="small-logo-in-responsive" />
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
                                    <span className="balance-text">₽ {balance.toFixed(2)}</span> {/* Отображаем числовое значение баланса */}
                                    <span className="greeting-text">{profile.name}!</span>
                                    <img src={logout} alt="Logout" className="logout" onClick={handleLogout}/>
                                </div>
                            ) : (
                                <button className="login-button" onClick={openModal}>
                                    <img src={sign} alt="Sign" className="sign.svg" />
                                    <span className="login-button-text">Вход</span>
                                </button>
                            )}

                            {showLogoutModal && (
                                <div className="logout-modal">
                                    <p>Вы действительно хотите выйти?</p>
                                    <button onClick={confirmLogout}>Да</button>
                                    <button onClick={cancelLogout}>Отмена</button>
                                </div>
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
                                <img src={wifi} alt="Wifi" className="wifi-button-icon" />
                            </div>
                            <span className="wifi-count">1</span>
                            <span className="wifi-online">online</span>
                        </div>

                        <div className="block vertical-sections">
                            <div className="second-section">
                                <img src={crown} alt="Crown" className="crown-icon" />
                            </div>
                            <div className="third-section">
                                <img src={cube} alt="Cube" className="cube-icon" />
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
