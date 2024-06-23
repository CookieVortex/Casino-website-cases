// Modal.js

import React, { useRef } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
    const modalRef = useRef(null);
    const modalClass = isOpen ? 'modal open' : 'modal';

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className={modalClass} ref={modalRef}>
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
