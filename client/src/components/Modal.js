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
                    <div className="input-container">
                        <input placeholder="Username" spellCheck="false" name="username" />
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20 18L14 18M17 15V21M7.68213 14C8.63244 14.6318 9.77319 15 10.9999 15C11.7012 15 12.3744 14.8797 13 14.6586M10.5 21H5.6C5.03995 21 4.75992 21 4.54601 20.891C4.35785 20.7951 4.20487 20.6422 4.10899 20.454C4 20.2401 4 19.9601 4 19.4V17C4 15.3431 5.34315 14 7 14H7.5M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z"
                                stroke="#000000"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="#000000"
                            />
                        </svg>
                    </div>
                    <div className="input-container">
                        <input type="password" placeholder="Password" autoComplete="on" name="password" />
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-10h-2.26C15.46 5.19 13.86 4 12 4c-1.86 0-3.46 1.19-3.74 3H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-6 0c.83 0 1.5.67 1.5 1.5S12.83 10 12 10s-1.5-.67-1.5-1.5S11.17 7 12 7z"
                                fill="#000000"
                            />
                        </svg>
                    </div>
                    <button className="btn-signin">Войти</button>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
