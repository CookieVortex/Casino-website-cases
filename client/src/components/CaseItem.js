import React from 'react';

const CaseItem = ({ caseItem }) => {
    return (
        <li>
            <h3>{caseItem.title}</h3>
            <p>{caseItem.description}</p>
            <img src={caseItem.image} alt={caseItem.title} />
        </li>
    );
};

export default CaseItem;
