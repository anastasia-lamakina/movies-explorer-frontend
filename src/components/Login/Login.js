import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react/cjs/react.development";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { getUser, postUserSignin } from "../../utils/MainApi";
import { useModal } from "../../utils/modal";
import { useFormWithValidation } from "../../utils/validation";
import { AuthFooter } from "../AuthFooter/AuthFooter";
import { AuthHeader } from "../AuthHeader/AuthHeader";
import { AuthLayout } from "../AuthLayout/AuthLayout";
import { InputField } from "../InputField/InputField";
import "./Login.css";

export const Login = () => {
  const formRef = useRef();
  const navigate = useNavigate();
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const { openModal } = useModal();
  const userContext = useContext(CurrentUserContext);

  useEffect(() => {
    getUser()
      .then((user) => {
        userContext.setName(user.name);
        userContext.setEmail(user.email);
        userContext.setId(user._id);
        navigate("/movies");
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: values.email,
      password: values.password,
    };

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
  };

  return (
    <AuthLayout
      header={<AuthHeader>Рады видеть!</AuthHeader>}
      footer={
        <AuthFooter
          buttonText={"Войти"}
          bottomText={"Ещё не зарегистрированы?"}
          bottomLinkText={"Регистрация"}
          bottomLinkTo={"/signup"}
          buttonDisabled={!isValid}
          onButtonClick={(e) =>
            formRef.current.dispatchEvent(
              new Event("submit", { bubbles: true, cancelable: true })
            )
          }
        />
      }
    >
      <form ref={formRef} className="login__form" onSubmit={handleFormSubmit}>
        <InputField
          name="email"
          label="E-mail"
          type="email"
          value={values.email}
          onChange={handleChange}
          minLength={2}
          errors={errors}
          required
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
