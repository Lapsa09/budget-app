import React, { useEffect, useState } from "react";
import CustomRadioInput from "../customRadioInput/CustomRadioInput";
import CustomMoneyInput from "../customMoneyInput/CustomMoneyInput";
import CustomTextInput from "../customTextInput/CustomTextInput";
import "./form.css";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, getForEdit } from "../../redux/features/ModalSlice";
import { getPosts, setFunds, setPosts } from "../../redux/features/PostsSlice";

function Form() {
  const [money, setMoney] = useState("");
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState(null);
  const [concept, setConcept] = useState("");
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);
  const incomes = useSelector(getForEdit);

  useEffect(() => {
    if (incomes) {
      setMoney(incomes.money);
      setType(incomes.income);
      setConcept(incomes.concept);
    }
  }, []);

  const handleRadio = (e) => {
    const valueRadio = e.target.value === "true" ? true : false;

    setType(valueRadio);
  };

  const handleMoney = (e) => {
    const _money = e.target.value.split(/[$,]/).slice(1).join("");
    setMoney(_money);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { money, date, income: type, concept };

      console.log(body);

      const res = await fetch(
        "https://rocky-fjord-87785.herokuapp.com/dashboard/incomes",
        {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify(body),
        }
      );

      const parseData = await res.json();

      dispatch(setPosts([parseData, ...posts]));
      dispatch(setFunds());
      dispatch(closeModal());
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const body = { money, concept };

      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const res = await fetch(
        `https://rocky-fjord-87785.herokuapp.com/dashboard/incomes/${incomes.id}`,
        {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify(body),
        }
      );

      const parseData = await res.json();

      dispatch(
        setPosts(
          posts.map((post) => (post.id == parseData.id ? parseData : post))
        )
      );
      dispatch(setFunds());
      dispatch(closeModal());
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="form-background">
      <form className="form">
        <div onClick={() => dispatch(closeModal())} className="form__close">
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
            label="Income"
            disabled={incomes}
          />
          <CustomRadioInput
            value="false"
            checked={type === false}
            onChange={handleRadio}
            label="Outcome"
            disabled={incomes}
          />
        </div>
        <CustomTextInput
          value={concept}
          type="text"
          label="Concept"
          onChange={(e) => setConcept(e.target.value)}
        />
        {incomes ? (
          <button onClick={handleEdit} type="submit">
            Edit
          </button>
        ) : (
          <button onClick={handleSubmit} type="submit">
            Submit
          </button>
        )}
      </form>
    </div>
  );
}

export default Form;
