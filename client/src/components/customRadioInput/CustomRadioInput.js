import React from "react";
import "./customRadioInput.css";

function CustomRadioInput({ text, value, onChange, checked }) {
  return (
    <label className="radio">
      <input type="radio" value={value} checked={checked} onChange={onChange} />
      {text}
      <span className="checkmark"></span>
    </label>
  );
}

export default CustomRadioInput;
