import React from "react";
import { SectionHeading } from "../../SectionHeading/SectionHeading";
import "./Technologies.css";

export const Technologies = () => (
  <section className="technologies">
    <SectionHeading>Технологии</SectionHeading>
    <h3 className="technologies__subheading">7 технологий</h3>
    <p className="technologies__paragraph">
      На курсе веб-разработки мы освоили технологии, которые применили в
      дипломном проекте.
    </p>
    <ul className="technologies__grid">
      <li className="technologies__grid-item">HTML</li>
      <li className="technologies__grid-item">CSS </li>
      <li className="technologies__grid-item">JS </li>
      <li className="technologies__grid-item">React</li>
      <li className="technologies__grid-item">Git</li>
      <li className="technologies__grid-item">Express.js</li>
      <li className="technologies__grid-item">mongoDB</li>
    </ul>
  </section>
);
