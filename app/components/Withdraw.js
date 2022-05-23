import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Page from "./Page";
import Axios from "axios";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

function Withdraw(props) {
  const [body, setBody] = useState();
  const navigate = useNavigate();
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  async function handleWithdraw(e) {
    e.preventDefault();
    try {
      const response = await Axios.post("/create-post", { title: "Withdraw", body, token: appState.user.token });
      // redirect to all data URL
      navigate(`/alldata/${appState.user.username}`);
      appDispatch({ type: "flashMessage", value: "Withdrawl was successful!" });
      console.log("withdraw was created");
    } catch (e) {
      console.log("there was a problem with withdraw", e);
    }
  }

  return (
    <Page title="Withdraw Funds">
      <div id="cards" className="card text-center">
        <div className="card-header">
          <strong>Withdraw Funds</strong>
        </div>
        <div className="card-body">
          <h5 className="card-title">Select amount to withdraw</h5>
          {/* <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input onChange={e => setBody(e.target.value)} autoFocus type="number" max="0" className="form-control" aria-label="Amount (to the nearest dollar)"></input>
            <div className="input-group-append">
              <span className="input-group-text">.00</span>
            </div>
          </div>
          <button onClick={handleWithdraw} className="btn btn-danger">
            Withdraw
          </button>
        </div>
        <div className="card-footer text-muted">
          <strong>Current Balance: $ ...</strong>
        </div>
      </div>
    </Page>
  );
}

export default Withdraw;
