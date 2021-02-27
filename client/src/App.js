import "./App.css";
import React, { useEffect, useState } from "react";
import Home from "./components/home/Home";
import Movements from "./components/movements/Movements";
import { useDispatch, useSelector } from "react-redux";
import { getModalState } from "./redux/features/ModalSlice";
import Form from "./components/form/Form";
import { setFunds, setPosts } from "./redux/features/PostsSlice";
import WithSpinner from "./components/spinner/with-spinner";
import axios from "axios";
import Tabs from "./components/tabs/Tabs";

const HomePageWithSpinner = WithSpinner(Home);

function App() {
  const modal = useSelector(getModalState);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://rocky-fjord-87785.herokuapp.com/api"
      );
      dispatch(setPosts(data));
      setLoading(false);
    };
    fetchData();
    dispatch(setFunds());
  }, []);

  return (
    <div className="app">
      <Tabs tabNames={["Home", "Movements"]}>
        <HomePageWithSpinner loading={loading} />
        <Movements />
      </Tabs>
      {modal && <Form />}
    </div>
  );
}

export default App;
