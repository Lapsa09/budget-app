import React from "react";
import "./customTextInput.css";

function CustomTextInput({ ...props }) {
  return (
    <label className="textInput">
      Category
      <input type="text" {...props} />
    </label>
  );
}

export default CustomTextInput;
