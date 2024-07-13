import React, {useEffect, useState} from 'react';
import './EventsSection.css';

const EventsSection = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <div className="events-section">
            <div className="left-section">
                <div className={`small-icon-container ${loaded ? 'loaded' : ''}`}>
                    <img className="small-icon" src="https://rustbox.io/assets/event/scrap/event-logo.webp"
                         alt={`Event logo.webp`}/>
                </div>
                <button className="event-button">к ивенту</button>
            </div>
            <div className="right-section">

            </div>
        </div>

    );
};

export default EventsSection;
