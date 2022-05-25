import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "./Page";
import Axios from "axios";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";
import { useImmer } from "use-immer";

function Withdraw(props) {
  const [body, setBody] = useState();
  const navigate = useNavigate();
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [validTransaction, setValidTransaction] = useState(false);
  const [state, setState] = useImmer({
    isLoading: true,
    feed: []
  });

  const handleChange = event => {
    console.log(Number(event.target.value));
    setBody(event.target.value);
    if (Number(event.target.value) <= 0) {
      return setValidTransaction(false);
    }
    if (Number(event.target.value) > addBalance(posts)) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
  };

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

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`);
        setPosts(response.data);

        // setIsLoading(false);
        setState(draft => {
          draft.isLoading = false;
          draft.feed = response.data;
        });
      } catch (e) {
        console.log("There was a problem on withdraw data fetch" + e);
      }
    }
    fetchPosts();
  }, []);

  function addBalance(prop) {
    var bal = 0;
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].title == "Deposit") {
        bal += parseInt(posts[i].body);
      } else {
        bal -= parseInt(posts[i].body);
      }
    }
    return bal;
    var checkBal = bal;
  }

  return (
    <Page title="Withdraw Funds">
      <div id="cards" className="card text-center">
        <div className="card-header">
          <h3>
            <strong>Withdraw Funds</strong>
          </h3>
        </div>
        <div className="card-body">
          <h5 className="card-title">Select amount below</h5>
          {/* <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>
            <input onChange={handleChange} autoFocus type="number" max="0" className="form-control" aria-label="Amount (to the nearest dollar)"></input>
            <div className="input-group-append">
              <span className="input-group-text">.00</span>
            </div>
          </div>
          <button onClick={handleWithdraw} disabled={!validTransaction} className="btn btn-danger">
            Withdraw
          </button>
        </div>
        <div className="card-footer text-muted">
          <h5>
            <strong>Current Balance: $ {addBalance(posts)}</strong>
          </h5>
        </div>
      </div>
    </Page>
  );
}

export default Withdraw;
