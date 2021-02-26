import React from "react";
import "./customRadioInput.css";

function CustomRadioInput({ label, ...otherProps }) {
  return (
    <label className="radio">
      <input type="radio" {...otherProps} />
      {label}
      <span className="checkmark"></span>
    </label>
  );
}

export default CustomRadioInput;
