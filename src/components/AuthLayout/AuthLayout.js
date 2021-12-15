import React from "react";
import "./AuthLayout.css";

export const AuthLayout = ({
  children,
  header,
  footer,
  className,
  mainClassName,
}) => (
  <div className={`auth-layout ${className}`}>
    {header}
    <main className={`auth-layout__main ${mainClassName}`}>{children}</main>
    {footer}
  </div>
);
