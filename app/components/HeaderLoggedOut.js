import React, { useEffect, useState } from "react";
import Axios from "axios";

// props is used for turnary operator on the header loggedin/out feature
// refer to Header.js for prop being passed
function HeaderLoggedOut(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const alignment = {
    marginLeft: "auto",
    marginRight: "0"
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await Axios.post("/login", { username, password });
      if (response.data) {
        // Local storage tokens
        localStorage.setItem("complexappToken", response.data.token);
        localStorage.setItem("complexappUsername", response.data.username);
        localStorage.setItem("complexappAvatar", response.data.avatar);
        props.setLoggedIn(true);
      } else {
        console.log("Incorrect username/password");
      }
    } catch (e) {
      console.log("there was a problem");
    }
  }

  return (
    <form style={alignment} onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input onChange={e => setUsername(e.target.value)} name="username" className="form-control form-control-sm input-light" type="text" placeholder="Username" autoComplete="off" />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input onChange={e => setPassword(e.target.value)} name="password" className="form-control form-control-sm input-light" type="password" placeholder="Password" />
        </div>
        <div className="col-md-auto">
          <button className="btn btn-primary btn-sm">Sign In</button>
        </div>
      </div>
    </form>
  );
}

export default HeaderLoggedOut;
