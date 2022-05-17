import React, { useEffect } from "react";
import Page from "./Page";

function Alldata() {
  // img styling
  const style = {
    width: "32px",
    height: "32px",
    borderRadius: "16px"
  };

  return (
    <Page title="All-Data">
      <div className="container container--narrow py-md-5">
        <h2 className="text-center mb-4">Transaction History</h2>
        <div className="list-group">
          <a href="#" className="list-group-item list-group-item-action">
            <img style={style} className="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" /> <strong>Example Post #1</strong>
            <span className="text-muted small">by brad on 2/10/2020 </span>
          </a>
          <a href="#" className="list-group-item list-group-item-action">
            <img style={style} className="avatar-tiny" src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128" /> <strong>Example Post #2</strong>
            <span className="text-muted small">by barksalot on 2/10/2020 </span>
          </a>
          <a href="#" className="list-group-item list-group-item-action">
            <img style={style} className="avatar-tiny" src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128" /> <strong>Example Post #3</strong>
            <span className="text-muted small">by brad on 2/10/2020 </span>
          </a>
          <a href="#" className="list-group-item list-group-item-action">
            <img style={style} className="avatar-tiny" src="https://gravatar.com/avatar/b9216295c1e3931655bae6574ac0e4c2?s=128" /> <strong>Example Post #4</strong>
            <span className="text-muted small">by barksalot on 2/10/2020 </span>
          </a>
        </div>
      </div>
    </Page>
  );
}

export default Alldata;
