import React from 'react';
import {useLocation} from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const location = useLocation();
    const {profile, balance} = location.state || {};

    if (!profile) {
        return <div>Profile data is not available</div>;
    }

    return (
        <div className="profile">
            <div className="section">
                <img src={profile.picture} className="avatar" alt={profile.name}/>
                <div className="profile-details">
                    <span className="profile-name">{profile.name}</span>
                    <span className="profile-email">{profile.email}</span>
                </div>
            </div>
            <div className="section">

            </div>
            <div className="section">Section 3</div>
        </div>
    );
};

export default Profile;
