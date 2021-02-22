import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import Form from "../form/Form";
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
    <div>
      <h3>${actual}</h3>
      <FlipMove>
        {posts.map(({ id, money, date, income, cathegory }) => (
          <Post
            key={id}
            money={money}
            date={date}
            income={income}
            cathegory={cathegory}
          />
        ))}
      </FlipMove>
      <Form />
    </div>
  );
}

export default Home;
