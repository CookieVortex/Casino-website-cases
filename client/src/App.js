import React, { useState, useEffect } from 'react';
import './App.css';
import CaseList from './components/CaseList';
import Header from './components/header';

const App = () => {
    const [cases, setCases] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/cases')
            .then(response => response.json())
            .then(data => setCases(data))
            .catch(error => console.error('Error fetching cases:', error));
    }, []);

    return (
        <div>
            <Header />
            <main>
                <CaseList cases={cases} />
            </main>
        </div>
    );
};

export default App;
