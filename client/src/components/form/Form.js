import React, { useState } from "react";
import axios from "axios";
import "./form.css";

function Form() {
  const [money, setMoney] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState(null);
  const [cathegory, setCathegory] = useState("");

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
      })
      .catch((e) => console.log(e));
  };
  return (
    <form>
      <label>
        Money
        <input
          type="number"
          value={money}
          onChange={(e) => setMoney(e.target.value)}
        />
      </label>
      <label>
        Date
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
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
      <label>
        Cathegory
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
