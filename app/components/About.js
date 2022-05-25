import React, { useEffect } from "react";
import Page from "./Page";

function About() {
  return (
    <Page title="About Us">
      <h2>About Us</h2>
      <p className="lead text-muted">Hello! Welcome to Bad Bank... </p>
      <p>Bad Bank was built to create a simple banking experience for users to swiftly manage their bank funds. This way there is more time left in the day for important tasks and fun activities.</p>
      <p>We hope you enjoy the user experience of this app, but if for any reason you are unsatisfied with the service, please do not hesitiate to contact the support team. </p>
    </Page>
  );
}

export default About;
