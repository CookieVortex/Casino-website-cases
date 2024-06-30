import React, { useEffect, useState } from 'react';
import './EventsSection.css';
import smallIcon from '../assets/images/person.png';

const EventsSection = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <div className="events-section">
            <div className="left-section">
                <div className={`small-icon-container ${loaded ? 'loaded' : ''}`}>
                    <img className="small-icon" src={smallIcon} alt=""/>
                </div>
                <button className="event-button">к ивенту</button>
            </div>
            <div className="right-section">
                <div className="events-section-title">
                </div>
            </div>
        </div>
    );
};

export default EventsSection;
