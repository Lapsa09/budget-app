import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomTextInput from "../customTextInput/CustomTextInput";
import "./register.css";

function Register({ setAuth }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch(
        "https://rocky-fjord-87785.herokuapp.com/authentication/register",
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
    <div className="register">
      <h2>Register</h2>
      <form>
        <CustomTextInput
          value={name}
          label="Name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
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

        <div className="reg__buttons">
          <button onClick={onSubmitForm} type="submit">
            Register
          </button>
          <Link className="loginLink" to="/login">
            Log In
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
