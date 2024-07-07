// Main.js

import React from 'react';
import './Main.css';
import loot1 from '../assets/images/loot1.png';
import loot2 from '../assets/images/loot2.png';
import loot3 from '../assets/images/loot3.png';
import loot4 from '../assets/images/loot4.png';
import loot5 from '../assets/images/loot5.png';
import loot6 from '../assets/images/loot6.png';

const Main = () => {
    const sections = [
        { img: loot1, label: '1.80 €' },
        { img: loot2, label: '2.65 €' },
        { img: loot3, label: '3.50 €' },
        { img: loot4, label: '4.75 €' },
        { img: loot5, label: '7.20 €' },
        { img: loot6, label: '9.10 €' },
    ];

    return (
        <div className="main-section">
            {sections.map((section, index) => (
                <div key={index} className="sub-section">
                    <img src={section.img} alt={`Loot ${index + 1}`} className={`loot${index + 1}`} />
                    <div className="button-container">
                        <button className="loot-button">{section.label}</button>
                    </div>
                    <div className="new-label">NEW</div>
                </div>
            ))}
        </div>
    );
};

export default Main;
