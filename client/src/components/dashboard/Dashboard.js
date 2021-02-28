import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getModalState } from "../../redux/features/ModalSlice";
import { setFunds, setPosts } from "../../redux/features/PostsSlice";
import Home from "../home/Home";
import Movements from "../movements/Movements";
import WithSpinner from "../spinner/with-spinner";
import Form from "../form/Form";
import Tabs from "../tabs/Tabs";
import "./dashboard.css";

const HomePageWithSpinner = WithSpinner(Home);
const MovementsWithSpinner = WithSpinner(Movements);

function Dashboard({ setAuth }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const modal = useSelector(getModalState);
  const dispatch = useDispatch();

  const fetchData = async () => {
    const res = await fetch(
      "https://rocky-fjord-87785.herokuapp.com/dashboard",
      {
        headers: { jwt_token: localStorage.token },
      }
    );

    const parseData = await res.json();

    setName(parseData[0].user_name);

    dispatch(setPosts(parseData[0].id === null ? [] : parseData));
    dispatch(setFunds());

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <Tabs tabNames={["Home", "Movements"]}>
        <HomePageWithSpinner name={name} setAuth={setAuth} loading={loading} />
        <MovementsWithSpinner loading={loading} />
      </Tabs>
      {modal && <Form />}
    </div>
  );
}

export default Dashboard;
