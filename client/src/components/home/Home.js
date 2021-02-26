import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/features/ModalSlice";
import {
  setPosts,
  getPosts,
  getFunds,
  setFunds,
} from "../../redux/features/PostsSlice";
import PostTable from "../postTable/PostTable";
import "./home.css";

function Home() {
  const posts = useSelector(getPosts);
  const dispatch = useDispatch();
  const funds = useSelector(getFunds);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:3000/api");
      dispatch(setPosts(data));
    };
    fetchData();
    dispatch(setFunds());
  }, []);

  useEffect(() => {
    dispatch(setFunds());
  });

  return (
    <div className="home">
      <div className="home__main">
        <div className="home__actual">
          <h3>Current Funds: ${funds}</h3>
        </div>
        <div onClick={() => dispatch(openModal())} className="home__more">
          +
        </div>
      </div>
      <PostTable posts={posts.slice(0, 10)} />
    </div>
  );
}

export default Home;
