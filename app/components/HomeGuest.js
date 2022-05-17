import React, { useState } from "react";
import Page from "./Page";
import Axios from "axios";

function HomeGuest() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await Axios.post("/register", { username, email, password });
      console.log("User was successfully created.");
    } catch (e) {
      console.log(e.response.data);
    }
  }

  return (
    <Page wide={true} title="Welcome!">
      <div className="row align-items-center">
        <div className="col-lg-7 py-3 py-md-5">
          <h1 className="display-3">Banking Simplified</h1>
          <p className="lead text-muted">Are you sick of overly complicated banking applications? At BadBank, we keep it quick and easy for you to manage your money so you can get on with your daily life. </p>
        </div>
        <div className="col-lg-5 pl-lg-5 pb-3 py-lg-5">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username-register" className="text-muted mb-1">
                <small>Username</small>
              </label>
              <input onChange={e => setUsername(e.target.value)} id="username-register" name="username" className="form-control" type="text" placeholder="Pick a username" autoComplete="off" />
            </div>
            <div className="form-group">
              <label htmlFor="email-register" className="text-muted mb-1">
                <small>Email</small>
              </label>
              <input onChange={e => setEmail(e.target.value)} id="email-register" name="email" className="form-control" type="text" placeholder="you@example.com" autoComplete="off" />
            </div>
            <div className="form-group">
              <label htmlFor="password-register" className="text-muted mb-1">
                <small>Password</small>
              </label>
              <input onChange={e => setPassword(e.target.value)} id="password-register" name="password" className="form-control" type="password" placeholder="Create a password" />
            </div>
            <button type="submit" className="py-3 mt-4 btn btn-lg btn-primary btn-block">
              Sign up for BadBank
            </button>
          </form>
        </div>
      </div>
    </Page>
  );
}

export default HomeGuest;
