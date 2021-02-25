import "./App.css";
import React from "react";
import Home from "./components/home/Home";
import Movements from "./components/movements/Movements";
import { useSelector } from "react-redux";
import { getModalState } from "./redux/features/ModalSlice";
import Form from "./components/form/Form";

function App() {
  const modal = useSelector(getModalState);
  return (
    <div className="app">
      <div className="tabs">
        <div className="tab-2">
          <label htmlFor="tab2-1">Home</label>
          <input
            id="tab2-1"
            name="tabs-two"
            type="radio"
            defaultChecked="checked"
          />
          <Home />
        </div>
        <div className="tab-2">
          <label htmlFor="tab2-2">Movements</label>
          <input id="tab2-2" name="tabs-two" type="radio" />
          <Movements />
        </div>
      </div>
      {modal && <Form />}
    </div>
  );
}

export default App;
