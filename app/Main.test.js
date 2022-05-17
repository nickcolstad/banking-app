import React from "react";
import * as ReactDOM from "react-dom";
import Main from "./Main";

test("Banking", () => {
  const container = document.getElementById("app");
  const root = createRoot(container);
  root.render(<Main />);
});
