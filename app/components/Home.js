import React, { useState, useContext, useEffect } from "react";
import Page from "./Page";
import { Link, useParams } from "react-router-dom";
import StateContext from "../StateContext";

function Home() {
  const appState = useContext(StateContext);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);

    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <Page title="Home Page">
      <div className="card text-center">
        <div className="card-header">
          <h5>
            Welcome, <strong>{appState.user.username}!</strong>
          </h5>
        </div>
        <img className="card-img-top" src="./components/bank.png" alt="Card image cap"></img>
        <div className="card-body">
          <h5 className="card-title"></h5>
          <p className="card-text">Select an Action</p>
          <Link to={`/deposit/${appState.user.username}`} className="btn btn-primary">
            Deposit
          </Link>{" "}
          <Link to={`/withdraw/${appState.user.username}`} className="btn btn-primary">
            Withdraw
          </Link>{" "}
          <Link to={`/alldata/${appState.user.username}`} className="btn btn-primary">
            All Data
          </Link>
        </div>
        <div className="card-footer text-muted">
          <strong>Time: </strong> {date.toLocaleTimeString()} <strong>Date: </strong>
          {date.toLocaleDateString()}
        </div>
      </div>
    </Page>
  );
}

export default Home;
