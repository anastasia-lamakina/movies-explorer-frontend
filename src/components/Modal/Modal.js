import React, { useContext } from "react";
import { ModalContext } from "../../contexts/ModalContext";
import "./Modal.css";

export const Modal = () => {
  const { type, message, setType, setMessage } = useContext(ModalContext);

  const handleModalClose = (e) => {
    setType(null);
    setMessage(null);
  };

  if (!type && !message) {
    return null;
  }

  return (
    <div className="modal" onClick={handleModalClose}>
      <p className="modal__message" onClick={(e) => e.stopPropagation()}>
        {message}
      </p>
    </div>
  );
};
