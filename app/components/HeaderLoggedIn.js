import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// props is used on the signout button to render the loggedin header as false
function HeaderLoggedIn(props) {
  function handleLogout() {
    props.setLoggedIn(false);
    // Handles removal of the local storage token when signing out
    localStorage.removeItem("complexappToken");
    localStorage.removeItem("complexappUsername");
    localStorage.removeItem("complexappAvatar");
  }

  // Override css style for profile avatar
  const style = {
    width: "32px",
    height: "32px",
    borderRadius: "16px"
  };

  const alignment = {
    marginLeft: "auto",
    marginRight: "0"
  };

  return (
    <>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/deposit">
            Deposit
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/withdraw">
            Withdraw
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/alldata">
            All Data
          </Link>
        </li>
      </ul>
      <div style={alignment} className="flex-row my-3 my-md-0">
        <Link to="/" className="text-white mr-2 header-search-icon">
          <i className="fas fa-search"></i>
        </Link>
        <Link to="/" className="mr-2">
          <img style={style} className="small-header-avatar" src={localStorage.getItem("complexappAvatar")} alt="avatar image" />
        </Link>
        <button onClick={handleLogout} className="btn btn-sm btn-secondary">
          Sign Out
        </button>
      </div>
    </>
  );
}

export default HeaderLoggedIn;
