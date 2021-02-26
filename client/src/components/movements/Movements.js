import axios from "axios";
import React, { useEffect } from "react";
import { setPosts, getPosts } from "../../redux/features/PostsSlice";
import PostTable from "../postTable/PostTable";
import { useDispatch, useSelector } from "react-redux";
import "./movements.css";

function Movements() {
  const posts = useSelector(getPosts);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://rocky-fjord-87785.herokuapp.com/api"
      );
      dispatch(setPosts(data));
    };
    fetchData();
  }, []);
  return (
    <div className="movements">
      <h1>Movements</h1>
      <PostTable posts={posts} />
    </div>
  );
}

export default Movements;
