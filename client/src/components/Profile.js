import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const location = useLocation();
    const { profile, balance } = location.state || {};
    const [copySuccess, setCopySuccess] = useState(false);

    if (!profile) {
        return <div>Данные профиля недоступны</div>;
    }

    const copyTextToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 3000);
        } catch (err) {
            console.error('Ошибка:', err);
        }
    };

    return (
        <div className="profile">
            <div className="section1">
                <div className="profile-left">
                    <img src={profile.picture} className="avatar" alt={profile.name}/>
                    <div className="profile-details">
                        <span className="profile-name">{profile.name}</span>
                        <span className="profile-balance">Баланс: € {balance ? balance.toFixed(2) : 'Загрузка...'}</span>
                        {copySuccess && <div className="copy-success">Текст успешно скопирован!</div>}
                    </div>
                </div>
                <div className="profile-right">
                    <button onClick={() => copyTextToClipboard(profile.googleId)} className="button1">
                        <span className="info-button">ID</span>
                        <span className="info-id">{profile.googleId}</span>
                    </button>
                    <button className="button2">2</button>
                    <button className="button3">3</button>
                    <button className="button4">4</button>
                </div>
            </div>
            <div className="section">
            </div>
            <div className="section">Раздел 3</div>
        </div>
    );
};

export default Profile;
