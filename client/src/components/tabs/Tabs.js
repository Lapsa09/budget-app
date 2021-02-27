import React from "react";
import { useDispatch } from "react-redux";
import { setTab } from "../../redux/features/TabSlice";
import "./tabs.css";

function Tabs({ children, tabNames }) {
  const dispatch = useDispatch();
  return (
    <div className="tabs">
      {children.map((child, index) => (
        <div className="tab-2" key={index}>
          <label htmlFor={`tab2-${index}`}>
            {tabNames[index] || "New tab"}
          </label>
          <input
            id={`tab2-${index}`}
            name="tabs-two"
            type="radio"
            defaultChecked={index === 0 && "checked"}
            onChange={() => dispatch(setTab(index))}
          />
          {child}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
