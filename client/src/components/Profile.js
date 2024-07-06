import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import './Profile.css';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Paper from "../assets/icons/paper.svg";
import Wallet from "../assets/icons/wallet.svg";
import setprofile from "../assets/icons/setprofile.svg";
import logoutprofile from "../assets/icons/logoutprofile.svg";
import {Tooltip} from 'react-tooltip';
import con2 from '../assets/images/con2.webp';

const Profile = () => {
    const location = useLocation();
    const {profile} = location.state || {};
    const [copySuccess, setCopySuccess] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        if (profile && profile.googleId) {
            fetchUserBalance();
        }
    }, [profile]);

    if (!profile) {
        return <div>Данные профиля недоступны</div>;
    }

    const copyTextToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success('Текст успешно скопирован в буфер обмена!', {autoClose: 3000});
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 5000);
        } catch (err) {
            console.error('Ошибка:', err);
            toast.error('Ошибка при копировании');
        }
    };

    const handleSave = () => {
        console.log("Сохранено:", inputValue);
    };

    // Разделение имени и фамилии
    const firstName = profile.name.split(' ')[0];

    const fetchUserBalance = async () => {
        if (!profile.googleId) {
            console.error('Google ID не найден');
            return;
        }
        try {
            const response = await fetch(`/api/user/balance?googleId=${profile.googleId}`);
            const data = await response.json();
            if (data.balance !== undefined) {
                setBalance(data.balance);
            }
        } catch (error) {
            console.error('Не удалось получить баланс пользователя', error);
        }
    };

    return (
        <div className="profile">
            <ToastContainer
                position="top-right"
                autoClose={5000}
                theme="dark"
            />
            <div className="section1">
                <div className="profile-top">
                    <div className="profile-left">
                        <img src={profile.picture} className="avatar" alt={profile.name}/>
                        <div className="profile-details">
                            <span className="profile-name">{firstName}</span>
                            <span className="balance-profile">€ {balance.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="profile-right">
                        <a className="my-anchor-element">
                            <button onClick={() => copyTextToClipboard(profile.googleId)} className="button1">
                                <span className="info-button"><img src={Paper} alt="Paper"
                                                                   className="paper-icon"/>ID</span>
                                <span className="info-id">{profile.googleId}</span>
                            </button>
                        </a>
                        <div className="button2"><img src={Wallet} alt="Wallet" className="wallet-icon"/></div>
                        <div className="button3"><img src={setprofile} alt="SettingsProfile" className="setprofile"/>
                        </div>
                        <div className="button4"><img src={logoutprofile} alt="Quit" className="logoutprofile"/></div>
                    </div>
                </div>
                <div className="form-container">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="input-field"
                        placeholder="Введите трейд-ссылку"
                    />
                    <button onClick={handleSave} className="save-button">Сохранить</button>
                </div>
            </div>
            <div className="section">
                <div className="case-container">
                    <div className="case-title">Любимый Кейс</div>
                    <div className="case-title-bonus">Бонусный кейс</div>
                    <button className="open-button">Открыть</button>
                </div>
                <img src={con2} alt="Case" className="case-image"/>
            </div>
            <div className="section">
                <div className="case-container">
                    <div className="case-title">Лучший дроп</div>
                    <div className="case-title-bonus">Facepunch TShirt</div>
                    <button className="open-button">3,98€</button>
                </div>
                <img src={con2} alt="Case" className="case-image"/>
            </div>

            <Tooltip anchorSelect=".my-anchor-element" place="top">
                Скопировать
            </Tooltip>
        </div>
    );
};

export default Profile;
