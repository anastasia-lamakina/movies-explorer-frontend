import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "../Login/Login";
import { Main } from "../Main/Main";
import { Movies } from "../Movies/Movies";
import { NotFound } from "../NotFoundPage/NotFoundPage";
import { Profile } from "../Profile/Profile";
import { Register } from "../Register/Register";
import { SavedMovies } from "../SavedMovies/SavedMovies";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route exact path="/" element={<Main />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
