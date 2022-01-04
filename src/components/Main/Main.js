import React, { useEffect, useState } from "react";
import { About } from "../About/About";
import { Footer } from "../Footer/Footer";
import { Technologies } from "./Technologies/Technologies";
import { Hero } from "./Hero/Hero";
import { Student } from "./Student/Student";
import { Header } from "./Header/Header";
import MenuHeader from "../MenuHeader/MenuHeader";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { getUser } from "../../utils/MainApi";

export const Main = () => {
  const [userSignedIn, setUserSignedIn] = useState(false);

  useEffect(() => {
    getUser().then(() => {
      setUserSignedIn(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(userSignedIn);
  return (
    <>
      {userSignedIn ? <MenuHeader /> : <Header />}
      <main>
        <Hero />
        <About />
        <Technologies />
        <Student />
      </main>
      <Footer />
    </>
  );
};
