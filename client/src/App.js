import "./App.css";
import React from "react";
import Home from "./components/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Form from "./components/form/Form";
import Navbar from "./components/navbar/Navbar";
import Movements from "./components/movements/Movements";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/movements">
            <Movements />
          </Route>
          <Route path="/new">
            <Form />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
