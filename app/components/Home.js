import React, { useEffect } from "react";
import Page from "./Page";
import { Link } from "react-router-dom";

const style = {
  width: "16rem",
  display: "flex",
  margin: "auto",
  marginTop: "25px"
};

function Home() {
  return (
    <Page title="Home Page">
      <div className="card text-center">
        <div className="card-header">
          Welcome, <strong>{localStorage.getItem("complexappUsername")}!</strong>
        </div>
        <img className="card-img-top" src="./components/bank.png" style={style} alt="Card image cap"></img>
        <div className="card-body">
          <h5 className="card-title"></h5>
          <p className="card-text">Select an Action</p>
          <Link to="/deposit" className="btn btn-primary">
            Deposit
          </Link>{" "}
          <Link to="/withdraw" className="btn btn-primary">
            Withdraw
          </Link>{" "}
          <Link to="/alldata" className="btn btn-primary">
            All Data
          </Link>
        </div>
        <div className="card-footer text-muted"></div>
      </div>
    </Page>
  );
}

export default Home;
