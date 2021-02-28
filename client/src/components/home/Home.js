import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../redux/features/ModalSlice";
import { getPosts, getFunds } from "../../redux/features/PostsSlice";
import PostTable from "../postTable/PostTable";
import "./home.css";

function Home({ setAuth, name }) {
  const posts = useSelector(getPosts);
  const dispatch = useDispatch();
  const funds = useSelector(getFunds);

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="home">
      <div className="home__logout">
        <p>Hello {name} </p>
        <button onClick={logout}>Logout</button>
      </div>
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
