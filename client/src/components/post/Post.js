import React, { forwardRef } from "react";
import { Edit, Delete } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { getTab } from "../../redux/features/TabSlice";
import { selectIncome, openModal } from "../../redux/features/ModalSlice";
import { getPosts, setPosts } from "../../redux/features/PostsSlice";
import axios from "axios";
import "./post.css";

const Post = forwardRef(({ id, money, income, concept, date }, ref) => {
  const tab = useSelector(getTab);
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);

  const handleDate = (date) => {
    const _date = date.split(/[-T]/);

    return `${_date[2]}-${_date[1]}-${_date[0]}`;
  };

  const handleEdit = () => {
    dispatch(
      selectIncome({
        id,
        money,
        income,
        concept,
      })
    );
    dispatch(openModal());
  };

  const handleDelete = async () => {
    const { data } = await axios.delete(
      `https://rocky-fjord-87785.herokuapp.com/api/${id}`
    );

    dispatch(setPosts(posts.filter((post) => post.id != id)));
  };
  return (
    <div ref={ref} className={`post ${tab === 1 && "editable"}`}>
      <p>{handleDate(date)}</p>
      <p>{concept}</p>
      <p>{income ? `$ ${money}` : `($ ${money})`}</p>

      <Edit
        onClick={handleEdit}
        className={`manageIcon ${tab === 1 && "active"}`}
      />
      <Delete
        onClick={handleDelete}
        className={`manageIcon ${tab === 1 && "active"}`}
      />
    </div>
  );
});

export default Post;
