import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import HeaderLoggedOut from "./HeaderLoggedOut";
import HeaderLoggedIn from "./HeaderLoggedIn";
import StateContext from "../StateContext";

function Header(props) {
  const appState = useContext(StateContext);

  function show() {}

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="">
        BadBank
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" onClick={show()}></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        {appState.loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
      </div>
    </header>
  );
}

export default Header;
