import React, { useState } from "react";
import "./Modal.css"; // 스타일링을 위한 CSS 파일 import

const ModalAddCategory = ({ isOpen, onClose, onConfirm }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleConfirm = () => {
    onConfirm(categoryName);
    setCategoryName("");
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>카테고리 추가</h2>
        <input
          type="text"
          placeholder="카테고리 이름"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button onClick={handleConfirm}>확인</button>
      </div>
    </div>
  );
};

export default ModalAddCategory;
