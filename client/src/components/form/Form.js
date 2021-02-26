import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomRadioInput from "../customRadioInput/CustomRadioInput";
import CustomMoneyInput from "../customMoneyInput/CustomMoneyInput";
import CustomTextInput from "../customTextInput/CustomTextInput";
import "./form.css";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, getForEdit } from "../../redux/features/ModalSlice";
import { getPosts, setPosts } from "../../redux/features/PostsSlice";

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

    const { data } = await axios.post(
      "https://rocky-fjord-87785.herokuapp.com/api",
      {
        money,
        date,
        income: type,
        concept,
      }
    );
    dispatch(setPosts([...data, ...posts]));
    dispatch(closeModal());
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const { data } = await axios.put(
      `https://rocky-fjord-87785.herokuapp.com/api/${incomes.id}`,
      {
        money,
        concept,
      }
    );
    dispatch(
      setPosts(posts.map((post) => (post.id == data[0].id ? data[0] : post)))
    );
    dispatch(closeModal());
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
