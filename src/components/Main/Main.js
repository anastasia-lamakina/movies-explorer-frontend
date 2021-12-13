import React from "react";
import { About } from "../About/About";
import { Footer } from "../Footer/Footer";
import { Technologies } from "./Technologies/Technologies";
import { Hero } from "./Hero/Hero";
import { Student } from "./Student/Student";

export const Main = () => (
  <>
    <Hero />
    <About />
    <Technologies />
    <Student />
    <Footer />
  </>
);
