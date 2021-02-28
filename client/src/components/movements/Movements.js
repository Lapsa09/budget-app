import React from "react";
import { getPosts } from "../../redux/features/PostsSlice";
import PostTable from "../postTable/PostTable";
import { useDispatch, useSelector } from "react-redux";
import "./movements.css";

function Movements() {
  const posts = useSelector(getPosts);
  return (
    <div className="movements">
      <h1>Movements</h1>
      <PostTable posts={posts} />
    </div>
  );
}

export default Movements;
