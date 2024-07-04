import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Profile.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Paper from "../assets/icons/paper.svg";
import Wallet from "../assets/icons/wallet.svg";
import setprofile from "../assets/icons/setprofile.svg";
import logoutprofile from "../assets/icons/logoutprofile.svg";
import { Tooltip } from 'react-tooltip';

const Profile = () => {
    const location = useLocation();
    const { profile } = location.state || {};
    const [copySuccess, setCopySuccess] = useState(false);
    const [inputValue, setInputValue] = useState("");

    if (!profile) {
        return <div>Данные профиля недоступны</div>;
    }

    const copyTextToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success('Текст успешно скопирован в буфер обмена!', { autoClose: 3000 });
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 5000);
        } catch (err) {
            console.error('Ошибка:', err);
            toast.error('Ошибка при копировании');
        }
    };

    const handleSave = () => {
        // Логика сохранения данных из inputValue
        console.log("Сохранено:", inputValue);
    };

    // Разделение имени и фамилии
    const firstName = profile.name.split(' ')[0];

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
                        <img src={profile.picture} className="avatar" alt={profile.name} />
                        <div className="profile-details">
                            <span className="profile-name">{firstName}</span>
                        </div>
                    </div>

                    <div className="profile-right">
                        <a className="my-anchor-element">
                            <button onClick={() => copyTextToClipboard(profile.googleId)} className="button1">
                                <span className="info-button"><img src={Paper} alt="Paper"
                                                                   className="paper-icon" />ID</span>
                                <span className="info-id">{profile.googleId}</span>
                            </button>
                        </a>
                        <div className="button2"><img src={Wallet} alt="Wallet" className="wallet-icon" /></div>
                        <div className="button3"><img src={setprofile} alt="SettingsProfile" className="setprofile" />
                        </div>
                        <div className="button4"><img src={logoutprofile} alt="Quit" className="logoutprofile" /></div>
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
                Раздел 2
            </div>
            <div className="section">Раздел 3</div>
            <Tooltip anchorSelect=".my-anchor-element" place="top">
                Скопировать
            </Tooltip>
        </div>
    );
};

export default Profile;
