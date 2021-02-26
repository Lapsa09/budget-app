import React from "react";
import "./customTextInput.css";

function CustomTextInput({ label, ...props }) {
  return (
    <label className="textInput">
      {label}
      <input type="text" {...props} />
    </label>
  );
}

export default CustomTextInput;
