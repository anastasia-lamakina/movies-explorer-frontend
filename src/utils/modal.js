import { useContext } from "react";
import { ModalContext } from "../contexts/ModalContext";

export const useModal = () => {
  const modalContext = useContext(ModalContext);

  const openModal = (type, message) => {
    modalContext.setType(type);
    modalContext.setMessage(message);
  };

  const closeModal = () => {
    modalContext.setMessage(null);
    modalContext.setMessage(null);
  };

  return { openModal, closeModal };
};
