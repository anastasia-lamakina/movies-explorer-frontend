import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { ModalContext } from "../../contexts/ModalContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Login } from "../Login/Login";
import { Main } from "../Main/Main";
import { Modal } from "../Modal/Modal";
import { Movies } from "../Movies/Movies";
import { NotFound } from "../NotFoundPage/NotFoundPage";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import { Profile } from "../Profile/Profile";
import { Register } from "../Register/Register";
import { SavedMovies } from "../SavedMovies/SavedMovies";

import "./App.css";

function App() {
  const [modalType, setModalType] = useState(null);
  const [modalMessage, setModalMessage] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [id, setId] = useState(null);

  const modalValue = {
    type: modalType,
    setType: setModalType,
    message: modalMessage,
    setMessage: setModalMessage,
  };

  const userValue = {
    name,
    setName,
    email,
    setEmail,
    setId,
    id,
  };

  return (
    <CurrentUserContext.Provider value={userValue}>
      <ModalContext.Provider value={modalValue}>
        <div className="App">
          <Modal />
          <Router>
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route exact path="/" element={<Main />} />
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/movies" element={<Movies />} />
                <Route path="/saved-movies" element={<SavedMovies />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path="/signin" element={<Login />} />
              <Route path="/signup" element={<Register />} />
            </Routes>
          </Router>
        </div>
      </ModalContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
