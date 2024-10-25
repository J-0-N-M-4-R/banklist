import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import './modal.css';
import '../brand.css';

function Modal({ isOpen, title, text, confirmText, cancelText, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{title}</h2> {/* Display custom title */}
        <p>{text}</p> {/* Display custom text */}
        <div className="modal-actions">
          {/* Conditionally render the confirm button if confirmText and onConfirm are provided */}
          {confirmText && onConfirm && (
            <button onClick={onConfirm}>{confirmText}</button>
          )}
          {/* Always render the cancel/close button */}
          <button onClick={onClose} style={!confirmText ? { margin: '0 auto' } : {}}>
            {cancelText || 'OK'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Add prop-types validation
Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired, // isOpen must be a boolean
  onClose: PropTypes.func.isRequired, // onClose must be a function
  onConfirm: PropTypes.func.isRequired, // onConfirm must be a function
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string.isRequired
};

export default Modal;