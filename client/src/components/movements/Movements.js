import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import FlipMove from "react-flip-move";
import "./movements.css";

function Movements() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:3000/api");
      setPosts(data);
    };
    fetchData();
  }, []);
  return (
    <div className="movements">
      <FlipMove className="movements__moves">
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
    </div>
  );
}

export default Movements;
