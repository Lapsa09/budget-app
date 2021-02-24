import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import FlipMove from "react-flip-move";
import "./home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [actual, setActual] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:3000/api");
      setPosts(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    getActives();
  });

  const getActives = () => {
    let inc = 0;
    let dec = 0;

    posts.forEach(({ income, money }) => {
      income ? (inc += money) : (dec += money);
    });

    setActual(inc - dec);
  };

  return (
    <div className="home">
      <div className="home__actual">
        <h3>Actual Funds: ${actual}</h3>
      </div>
      <FlipMove className="home__table">
        {posts &&
          posts
            .slice(0, 10)
            .map(({ id, money, date, income, cathegory }) => (
              <Post
                key={id}
                money={money}
                date={date}
                income={income}
                cathegory={cathegory}
              />
            ))}
      </FlipMove>
    </div>
  );
}

export default Home;
