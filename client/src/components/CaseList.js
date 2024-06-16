import React from 'react';
import CaseItem from './CaseItem';

const CaseList = ({ cases }) => {
    return (
        <div>
            <h2>Список кейсов</h2>
            <ul>
                {cases.map((caseItem) => (
                    <CaseItem key={caseItem.id} caseItem={caseItem} />
                ))}
            </ul>
        </div>
    );
};

export default CaseList;
