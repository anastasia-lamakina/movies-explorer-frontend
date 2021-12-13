import React from "react";
import { AuthLayout } from "../AuthLayout/AuthLayout";
import { InputField } from "../InputField/InputField";
import MenuHeader from "../MenuHeader/MenuHeader";
import "./Profile.css";

export const Profile = () => (
  <AuthLayout
    header={<MenuHeader />}
    footer={
      <div className="profile__button-container">
        <button className="profile__save-button">Редактировать</button>
        <button className="profile__signout-button">Выйти из аккаунта</button>
      </div>
    }
  >
    <h1 className="profile__heading">Привет, Анастасия!</h1>
    <div className="profile__input-container">
      <InputField name="name" label="Имя" value={"Анастасия"} variant="alt" />
      <div className="profile__input-separator" />
      <InputField
        name="email"
        label="E-mail"
        value={"anastasia.lamakina@email.cz"}
        variant="alt"
      />
    </div>
  </AuthLayout>
);
