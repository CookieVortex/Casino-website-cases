import React, { useEffect, useRef } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children }) => {
    const modalRef = useRef(null);
    const overlayRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            if (modalRef.current && overlayRef.current) {
                modalRef.current.classList.add('open');
                overlayRef.current.classList.add('open');
            }
        } else {
            if (modalRef.current && overlayRef.current) {
                modalRef.current.classList.remove('open');
                overlayRef.current.classList.remove('open');
            }
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" ref={overlayRef}>
            <div className="modal" ref={modalRef}>
                <button className="modal-close" onClick={onClose}>
                    &times;
                </button>
                <div className="modal-content">
                    <div className="modal-title">Войти</div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
