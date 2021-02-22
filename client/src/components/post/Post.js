import React, { forwardRef } from "react";
import "./post.css";

const Post = forwardRef(({ money, income, cathegory, date }, ref) => {
  const handleDate = (date) => {
    const _date = date.split(/[-T]/);

    return `${_date[2]}-${_date[1]}-${_date[0]}`;
  };
  return (
    <div ref={ref}>
      <p>${money}</p>
      <p>{handleDate(date)}</p>
      <p>{income ? "Income" : "Outcome"}</p>
      <p>{cathegory}</p>
    </div>
  );
});

export default Post;
