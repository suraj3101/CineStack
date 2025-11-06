import React from "react";
import "./Modal.css";

function Modal({ onClose, children }) {
  const handleContentClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={handleContentClick}>
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
