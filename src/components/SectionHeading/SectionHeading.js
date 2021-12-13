import React from "react";
import "./SectionHeading.css";

export const SectionHeading = ({ children: text }) => (
  <>
    <h2 className="section__heading">{text}</h2>
    <div className="section__separator" />
  </>
);
