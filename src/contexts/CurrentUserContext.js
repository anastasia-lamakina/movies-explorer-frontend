import React from "react";

export const CurrentUserContext = React.createContext({
  name: "",
  email: "",
  id: "",
  setId: () => {},
  setName: () => {},
  setEmail: () => {},
});
