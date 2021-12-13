import React from "react";
import { AuthFooter } from "../AuthFooter/AuthFooter";
import { AuthHeader } from "../AuthHeader/AuthHeader";
import { AuthLayout } from "../AuthLayout/AuthLayout";
import { InputField } from "../InputField/InputField";

export const Register = () => (
  <AuthLayout
    header={<AuthHeader>Добро пожаловать!</AuthHeader>}
    footer={
      <AuthFooter
        buttonText={"Зарегистрироваться"}
        bottomText={"Уже зарегистрированы?"}
        bottomLinkText={"Войти"}
        bottomLinkTo={"/signin"}
      />
    }
  >
    <form>
      <InputField name="name" label="Имя" />
      <InputField name="email" label="E-mail" type="email" />
      <InputField name="password" label="Пароль" type="password" />
    </form>
  </AuthLayout>
);
