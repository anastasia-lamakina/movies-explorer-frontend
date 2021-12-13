import React, { useRef } from "react";
import { AuthFooter } from "../AuthFooter/AuthFooter";
import { AuthHeader } from "../AuthHeader/AuthHeader";
import { AuthLayout } from "../AuthLayout/AuthLayout";
import { InputField } from "../InputField/InputField";

export const Login = () => {
  const formRef = useRef();

  return (
    <AuthLayout
      header={<AuthHeader>Рады видеть!</AuthHeader>}
      footer={
        <AuthFooter
          buttonText={"Войти"}
          bottomText={"Ещё не зарегистрированы?"}
          bottomLinkText={"Регистрация"}
          bottomLinkTo={"/signup"}
          onButtonClick={() =>
            formRef.current.submit((e) => e.preventDefault())
          }
        />
      }
    >
      <form ref={formRef}>
        <InputField name="email" label="E-mail" type="email" />
        <InputField name="password" label="Пароль" type="password" />
      </form>
    </AuthLayout>
  );
};
