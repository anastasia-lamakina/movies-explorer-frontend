import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { getUser, postUserSignin, postUserSignup } from "../../utils/MainApi";
import { useModal } from "../../utils/modal";
import { useFormWithValidation } from "../../utils/validation";
import { AuthFooter } from "../AuthFooter/AuthFooter";
import { AuthHeader } from "../AuthHeader/AuthHeader";
import { AuthLayout } from "../AuthLayout/AuthLayout";
import { InputField } from "../InputField/InputField";
import "./Register.css";

export const Register = () => {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const formRef = useRef();
  const navigate = useNavigate();

  const { openModal } = useModal();
  const userContext = useContext(CurrentUserContext);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    postUserSignup(data)
      .then(() => {
        postUserSignin(data)
          .then(() => {
            getUser().then((user) => {
              userContext.setName(user.name);
              userContext.setEmail(user.email);
              userContext.setId(user._id);

              navigate("/movies");
            });
          })
          .catch((err) => {
            openModal("error", err.message);
          });
      })
      .catch((err) => {
        openModal("error", err.message);
      });
  };

  return (
    <AuthLayout
      header={<AuthHeader>Добро пожаловать!</AuthHeader>}
      footer={
        <AuthFooter
          buttonText={"Зарегистрироваться"}
          bottomText={"Уже зарегистрированы?"}
          bottomLinkText={"Войти"}
          bottomLinkTo={"/signin"}
          buttonDisabled={!isValid}
          onButtonClick={(e) =>
            formRef.current.dispatchEvent(
              new Event("submit", { bubbles: true, cancelable: true })
            )
          }
        />
      }
    >
      <form
        className="register__form"
        onSubmit={handleFormSubmit}
        ref={formRef}
      >
        <InputField
          name="name"
          label="Имя"
          value={values.name}
          onChange={handleChange}
          required
          minLength={2}
          maxLength={30}
          errors={errors}
        />
        <InputField
          name="email"
          label="E-mail"
          type="email"
          value={values.email}
          onChange={handleChange}
          minLength={2}
          required
          errors={errors}
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
        />
        <InputField
          name="password"
          label="Пароль"
          type="password"
          value={values.password}
          onChange={handleChange}
          required
          minLength={8}
          errors={errors}
        />
      </form>
    </AuthLayout>
  );
};
