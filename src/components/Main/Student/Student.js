import React from "react";
import "./Student.css";
import studentImage from "../../../images/student.jpg";
import arrowIcon from "../../../images/arrowIcon.svg";
import { SectionHeading } from "../../SectionHeading/SectionHeading";

const PorfolioEntry = ({ text, href }) => (
  <li className="student__portfolio-list-item">
    <a href={href} className="student__portfolio-list-item-link">
      {text}
      <img src={arrowIcon} alt="arrow icon" />
    </a>
  </li>
);

export const Student = () => (
  <section className="student">
    <SectionHeading>Студент</SectionHeading>
    <span className="student__container">
      <img
        className="student__image"
        src={studentImage}
        alt="Depiction of the student"
      />
      <div className="student__container-group">
        <h3 className="student__name">Анастасия</h3>
        <p className="student__subheading">Фронтенд-разработчик, 26 лет</p>

        <p className="student__paragraph">
          Я родилась в Омске, в 14 лет переехала в Сассари, где закончила
          старшую школу и училась на факультете лингвистики. Сейчас живу в Чехии
          с мужем и кошкой. Увлекаюсь бегом, пленочной фотографией и играю на
          укулеле. Недавно начала кодить. Сейчас пишу личные проекты на реакте и
          собираю портфолио.
        </p>
        <ul className="student__socials">
          <li>
            <a
              className="student__socials-link"
              href="https://www.facebook.com/iclosemyeyes/"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              className="student__socials-link"
              href="https://github.com/anastasia-lamakina"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </span>
    <h3 className="student__portfolio-heading">Портфолио</h3>
    <ul className="student__portfolio-list">
      <PorfolioEntry
        href="https://github.com/anastasia-lamakina/how-to-learn"
        text="Статичный сайт"
      />
      <div className="student__portfolio-list-separator" />
      <PorfolioEntry
        href="https://github.com/anastasia-lamakina/russian-travel"
        text="Адаптивный сайт"
      />
      <div className="student__portfolio-list-separator" />
      <PorfolioEntry
        href="https://github.com/anastasia-lamakina/react-mesto-api-full"
        text="Одностраничное приложение"
      />
    </ul>
  </section>
);
