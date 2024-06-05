import React from 'react';
import './style.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const handleClose = () => {
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      {isOpen && (
        <div
          className="modal-overlay"
          onClick={handleClose}
        >
          <div className="modal relative" onClick={handleOverlayClick}>
              <button className="close-icon" onClick={handleClose} style={{position: 'absolute', top: '5px', right: '5px'}}>
                &times;
              </button>
            <div className="modal-content mt-8 mb-2">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
