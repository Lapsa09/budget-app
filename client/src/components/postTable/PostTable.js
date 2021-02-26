import React from "react";
import Post from "../post/Post";
import FlipMove from "react-flip-move";
import "./postTable.css";
import { useSelector } from "react-redux";
import { getTab } from "../../redux/features/TabSlice";

function PostTable({ posts }) {
  const tab = useSelector(getTab);
  return (
    <div className="postTable">
      <div className={`postTable__header ${tab === 1 && "editable"}`}>
        <p>Date</p>
        <p>Concept</p>
        <p>Amount</p>
      </div>
      <div>
        <FlipMove className="postTable__rows">
          {posts?.map(({ id, money, date, income, concept }) => (
            <Post
              key={id}
              id={id}
              money={money}
              date={date}
              income={income}
              concept={concept}
            />
          ))}
        </FlipMove>
      </div>
    </div>
  );
}

export default PostTable;
