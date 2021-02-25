import React, { useState } from "react";
import axios from "axios";
import CustomRadioInput from "../customRadioInput/CustomRadioInput";
import CustomMoneyInput from "../customMoneyInput/CustomMoneyInput";
import CustomTextInput from "../customTextInput/CustomTextInput";
import "./form.css";
import { useDispatch } from "react-redux";
import { toggleModal } from "../../redux/features/ModalSlice";

function Form() {
  const [money, setMoney] = useState("");
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState(null);
  const [cathegory, setCathegory] = useState("");
  const dispatch = useDispatch();

  const handleRadio = (e) => {
    const valueRadio = e.target.value === "true" ? true : false;

    setType(valueRadio);
  };

  const handleMoney = (e) => {
    const _money = e.target.value.split(/[$,]/).slice(1).join("");
    setMoney(_money);
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
        dispatch(toggleModal());
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="form-background">
      <form className="form">
        <div onClick={() => dispatch(toggleModal())} className="form__close">
          X
        </div>
        <CustomMoneyInput
          onChange={handleMoney}
          value={money}
          placeholder="$0"
        />
        <div className="movement__type">
          <CustomRadioInput
            value="true"
            checked={type === true}
            onChange={handleRadio}
            text="Income"
          />
          <CustomRadioInput
            value="false"
            checked={type === false}
            onChange={handleRadio}
            text="Outcome"
          />
        </div>
        <CustomTextInput
          value={cathegory}
          onChange={(e) => setCathegory(e.target.value)}
        />
        <button onClick={handleSubmit} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
