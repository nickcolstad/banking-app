import React, { useEffect, useContext } from "react";
import { Link, useHistory, useNavigate } from "react-router-dom";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

// props is used on the signout button to render the loggedin header as false
function HeaderLoggedIn(props) {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  const navigate = useNavigate();

  function handleLogout() {
    appDispatch({ type: "logout" });
    appDispatch({ type: "flashMessage", value: "You have successfully logged out" });
    navigate("/");
  }

  const alignment = {
    marginLeft: "auto",
    marginRight: "0"
  };

  return (
    <>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to={`/deposit/${appState.user.username}`}>
            Deposit
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={`/withdraw/${appState.user.username}`}>
            Withdraw
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" to={`/manage/${appState.user.username}`}>
            Manage Funds
          </Link>
        </li> */}
        <li className="nav-item">
          <Link className="nav-link" to={`/alldata/${appState.user.username}`}>
            All Data
          </Link>
        </li>
      </ul>
      <div style={alignment} className="flex-row my-3 my-md-0">
        <Link to={`/alldata/${appState.user.username}`} className="mr-2">
          <img className="avatar-small" src={appState.user.avatar} alt="avatar image" />
        </Link>
        <button onClick={handleLogout} className="btn btn-sm btn-secondary">
          Sign Out
        </button>
      </div>
    </>
  );
}

export default HeaderLoggedIn;
