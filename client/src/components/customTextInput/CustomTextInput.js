import React from "react";
import "./customTextInput.css";

function CustomTextInput({ label, type, ...props }) {
  return (
    <label className="textInput">
      {label}
      <input type={type} {...props} />
    </label>
  );
}

export default CustomTextInput;
