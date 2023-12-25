import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalBehavior, setModalBehavior] = useState(() => {
    return () => {};
  });

  const openModal = (message, modalSuccess, modalBehavior) => {
    setModalMessage(message);
    setModalOpen(true);
    setModalSuccess(modalSuccess);
    if (modalBehavior != null)
      setModalBehavior(() => {
        return modalBehavior;
      });
    // modalBehavior && setModalBehavior(modalBehavior);
    // setModalBehavior(modalBehavior);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => {
      setModalMessage("");
    }, 500);
    modalBehavior();
  };

  const value = {
    isModalOpen,
    modalMessage,
    modalSuccess,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
