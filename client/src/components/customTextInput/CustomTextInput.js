import React from "react";
import "./customTextInput.css";

function CustomTextInput({ value, onChange }) {
  return (
    <label className="textInput">
      Category
      <input type="text" value={value} onChange={onChange} />
    </label>
  );
}

export default CustomTextInput;
