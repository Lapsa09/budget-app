import React from "react";
import "./with-spinner.css";

function WithSpinner(WrappedComponent) {
  const Spinner = ({ loading, ...otherProps }) => {
    return loading ? (
      <div className="spinner-overlay">
        <div className="spinner-container"></div>
      </div>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
  return Spinner;
}

export default WithSpinner;
