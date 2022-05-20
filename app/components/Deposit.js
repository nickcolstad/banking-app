import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Page from "./Page";
import Axios from "axios";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

function Deposit(props) {
  // const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const navigate = useNavigate();
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  async function handleDeposit(e) {
    e.preventDefault();
    try {
      const response = await Axios.post("/create-post", { title: "Deposit", body, token: appState.user.token });
      // redirect to all data URL
      navigate(`/alldata/${appState.user.username}`);
      appDispatch({ type: "flashMessage", value: "Deposit was successful" });
      console.log("deposit was created");
    } catch (e) {
      console.log("there was a problem with deposit", e);
    }
  }

  return (
    <Page title="Deposit Funds">
      <div id="cards" className="card text-center">
        <div className="card-header">Deposit Funds</div>
        <div className="card-body">
          <h5 className="card-title">Select amount to depsoit</h5>
          {/* <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input onChange={e => setBody(e.target.value)} autoFocus type="text" className="form-control" aria-label="Amount (to the nearest dollar)"></input>
            <div className="input-group-append">
              <span className="input-group-text">.00</span>
            </div>
          </div>
          <button onClick={handleDeposit} href="" className="btn btn-success">
            Deposit
          </button>
        </div>
        <div className="card-footer text-muted">
          <strong>Current Balance: $ ...</strong>
        </div>
      </div>
    </Page>
  );
}

require("react-dom");
window.React2 = require("react");
console.log(window.React1 === window.React2);

export default Deposit;
