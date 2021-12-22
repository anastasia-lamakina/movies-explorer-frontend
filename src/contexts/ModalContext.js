import React from "react";

export const ModalContext = React.createContext({
  type: "",
  message: "",
  setType: () => {},
  setMessage: () => {},
});
