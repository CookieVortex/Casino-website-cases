import React, {useEffect, useState} from 'react';
import './Main.css';
import axios from 'axios';

const Main = () => {
    const [cases, setCases] = useState([]);

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/case/cases');
                setCases(response.data);
            } catch (error) {
                console.error('Error fetching cases:', error);
            }
        };

        fetchCases();
    }, []);

    return (
        <div className="main-section">
            {cases.map((caseItem, index) => (
                <div key={caseItem._id} className="sub-section">
                    <img src={caseItem.imageUrl} alt={caseItem.name} className={`loot${index + 1}`}/>
                    <div className="button-container">
                        <button className="loot-button">{`${caseItem.price} €`}</button>
                    </div>
                    <div className="new-label">NEW</div>
                    <p className="case-name">{caseItem.name}</p>
                </div>
            ))}
        </div>
    );
};

export default Main;
