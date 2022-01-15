import React from "react";
import "./InputField.css";

export const InputField = ({
  placeholder,
  name,
  minLength = undefined,
  maxLength = undefined,
  type = undefined,
  value = "",
  onChange = () => {},
  inputRef,
  label,
  variant,
  errors,
  required,
  pattern,
}) => (
  <div
    className={`input__container ${
      variant === "alt" ? "input__container_alt" : ""
    }`}
  >
    <label
      className={`input__label ${variant === "alt" ? "input__label_alt" : ""}`}
      htmlFor={name}
    >
      {label}
    </label>
    <input
      ref={inputRef}
      className={`input ${variant === "alt" ? "input_alt" : ""}`}
      placeholder={placeholder}
      name={name}
      required={required}
      minLength={minLength}
      maxLength={maxLength}
      type={type}
      value={value}
      onChange={(e) => onChange(e)}
      pattern={pattern}
    />
    {errors?.[name] && <span className="input__span">{errors[name]}</span>}
  </div>
);
