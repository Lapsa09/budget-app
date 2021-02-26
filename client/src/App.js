import "./App.css";
import React from "react";
import Home from "./components/home/Home";
import Movements from "./components/movements/Movements";
import { useDispatch, useSelector } from "react-redux";
import { getModalState } from "./redux/features/ModalSlice";
import { setTab } from "./redux/features/TabSlice";
import Form from "./components/form/Form";

function App() {
  const modal = useSelector(getModalState);
  const dispatch = useDispatch();

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
            onChange={() => dispatch(setTab(0))}
          />
          <Home />
        </div>
        <div className="tab-2">
          <label htmlFor="tab2-2">Movements</label>
          <input
            id="tab2-2"
            name="tabs-two"
            type="radio"
            onChange={() => dispatch(setTab(1))}
          />
          <Movements />
        </div>
      </div>
      {modal && <Form />}
    </div>
  );
}

export default App;
