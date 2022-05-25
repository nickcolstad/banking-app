import React, { useEffect } from "react";
import Page from "./Page";

function Terms() {
  return (
    <Page title="Terms and Conditions">
      <h2>Our Terms &amp; Conditions</h2>
      <p className="lead text-muted">We are not insured under FDIC</p>
      <p>This is not a real banking application. </p>
      <p>Made with &hearts; by Nick Colstad</p>
      <h4>Contact Us</h4>
      <div>
        <a href="https://github.com/nickcolstad">Github.com</a>
        <> || </>
        <a href="https://linkedin.com/in/nick-colstad-5373b5148">LinkedIn</a>
      </div>
    </Page>
  );
}

export default Terms;
