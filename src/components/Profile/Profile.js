import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { getUser, patchUserUpdate, postLogout } from "../../utils/MainApi";
import { useModal } from "../../utils/modal";
import { useFormWithValidation } from "../../utils/validation";
import { AuthLayout } from "../AuthLayout/AuthLayout";
import { InputField } from "../InputField/InputField";
import MenuHeader from "../MenuHeader/MenuHeader";
import "./Profile.css";

export const Profile = () => {
  const formRef = useRef();
  const { openModal } = useModal();
  const { email, name, setName, setEmail, setId } =
    useContext(CurrentUserContext);
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid, setValues } =
    useFormWithValidation();

  useEffect(() => {
    setValues({ name, email });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: values.name,
      email: values.email,
    };

    patchUserUpdate(data)
      .then(() => {
        getUser().then((user) => {
          setName(user.name);
          setEmail(user.email);
          setId(user._id);

          openModal("success", "Профиль обновлен.");
        });
      })
      .catch((err) => {
        openModal("error", err.message);
      });
  };

  const handleSave = () => {
    formRef.current.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    );
  };

  const handleLogout = () => {
    postLogout().then(() => {
      navigate("/");
    });
  };

  return (
    <AuthLayout
      header={<MenuHeader />}
      footer={
        <div className="profile__button-container">
          <button
            className="profile__save-button"
            onClick={handleSave}
            disabled={!isValid}
          >
            Редактировать
          </button>
          <button className="profile__signout-button" onClick={handleLogout}>
            Выйти из аккаунта
          </button>
        </div>
      }
    >
      <h1 className="profile__heading">Привет, {name}!</h1>
      <form
        className="profile__input-container"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <InputField
          name="name"
          label="Имя"
          value={values.name}
          onChange={handleChange}
          errors={errors}
          variant="alt"
          required
          minLength={2}
        />
        <div className="profile__input-separator" />
        <InputField
          name="email"
          label="E-mail"
          value={values.email}
          onChange={handleChange}
          errors={errors}
          minLength={8}
          required
          variant="alt"
        />
      </form>
    </AuthLayout>
  );
};
