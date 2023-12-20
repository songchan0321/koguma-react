// ParentComponent.js
import React, { useState } from "react";
import Modal from "./Modal";

const ParentComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>모달 열기</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <p>모달 내용이 여기에 들어갑니다.</p>
        {/* 다른 컴포넌트나 내용을 여기에 추가하세요 */}
      </Modal>
    </div>
  );
};

export default ParentComponent;
