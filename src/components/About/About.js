import React from "react";
import { SectionHeading } from "../SectionHeading/SectionHeading";
import "./About.css";

export const About = () => (
  <section className="about">
    <SectionHeading>О проекте</SectionHeading>
    <div className="about__content">
      <span>
        <h3 className="about__subheading">Дипломный проект включал 5 этапов</h3>
        <p className="about__paragraph">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
      </span>
      <span>
        <h3 className="about__subheading">
          На выполнение диплома ушло 5 недель
        </h3>
        <p className="about__paragraph">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </span>
    </div>
    <div className="progress">
      <div className="progress__entry">
        <div className="progress__entry-cell progress__entry-cell_done ">
          1 неделя
        </div>
        <div className="progress__entry-text">Back-end</div>
      </div>
      <div className="progress__entry">
        <div className="progress__entry-cell">4 недели</div>
        <div className="progress__entry-text">Front-end</div>
      </div>
    </div>
  </section>
);
