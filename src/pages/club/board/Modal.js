// Modal.js
import React from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "open" : ""}`}
      onClick={handleBackgroundClick}
    >
      <div className="modal-content">
        {children}
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default Modal;
