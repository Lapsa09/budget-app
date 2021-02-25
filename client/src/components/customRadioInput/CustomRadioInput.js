import React from "react";
import "./customRadioInput.css";

function CustomRadioInput({ text, ...otherProps }) {
  return (
    <label className="radio">
      <input type="radio" {...otherProps} />
      {text}
      <span className="checkmark"></span>
    </label>
  );
}

export default CustomRadioInput;
