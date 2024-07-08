import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CaseList = () => {
    const [cases, setCases] = useState([]);

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/case');
                setCases(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCases();
    }, []);

    return (
        <div>
            {cases.map((caseItem) => (
                <div key={caseItem._id}>
                    <h2>{caseItem.name}</h2>
                    <p>Price: {caseItem.price}</p>
                    <img src={caseItem.imageUrl} alt={caseItem.name} />
                </div>
            ))}
        </div>
    );
};

export default CaseList;
