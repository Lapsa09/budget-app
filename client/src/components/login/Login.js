import React, { useState } from "react";
import CustomTextInput from "../customTextInput/CustomTextInput";
import { Link } from "react-router-dom";
import "./login.css";

function Login({ setAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        "https://rocky-fjord-87785.herokuapp.com/authentication/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
      } else {
        setAuth(false);
        setError(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div className="login">
      <h2>Log In</h2>
      <form>
        <CustomTextInput
          value={email}
          label="Email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <CustomTextInput
          value={password}
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="error">{error}</p>
        <div className="login__buttons">
          <button onClick={onSubmitForm} type="submit">
            Login
          </button>
          <Link className="registerLink" to="/register">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
