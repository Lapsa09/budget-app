import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-date-picker";
import { useHistory } from "react-router-dom";
import "./form.css";

function Form() {
  const [money, setMoney] = useState("");
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState(null);
  const [cathegory, setCathegory] = useState("");
  const history = useHistory();

  const handleRadio = (e) => {
    const valueRadio = e.target.value === "true" ? true : false;

    setType(valueRadio);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/api", {
        money,
        date,
        income: type,
        cathegory,
      })
      .then(() => {
        setMoney("");
        setDate("");
        setType(null);
        setCathegory("");
        history.push("/");
      })
      .catch((e) => console.log(e));
  };
  return (
    <form className="form">
      <label>
        $
        <input
          type="number"
          value={money}
          onChange={(e) => setMoney(e.target.value)}
        />
      </label>
      <div className="movement__type">
        <label>
          <input
            type="radio"
            value="true"
            checked={type === true}
            onChange={handleRadio}
          />
          Income
        </label>
        <label>
          <input
            type="radio"
            value="false"
            checked={type === false}
            onChange={handleRadio}
          />
          Outcome
        </label>
      </div>
      <label>
        Category
        <input
          type="text"
          value={cathegory}
          onChange={(e) => setCathegory(e.target.value)}
        />
      </label>
      <button onClick={handleSubmit} type="submit">
        Send
      </button>
    </form>
  );
}

export default Form;
