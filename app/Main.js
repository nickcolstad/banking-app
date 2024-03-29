import React, { useState, useReducer, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { useImmerReducer } from "use-immer";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Axios from "axios";
Axios.defaults.baseURL = process.env.BACKENDURL || "https://afternoon-dawn-85630.herokuapp.com";

import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";

// All components
import Header from "./components/Header";
import HomeGuest from "./components/HomeGuest";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./components/About";
import Terms from "./components/Terms";
import Deposit from "./components/Deposit";
import Withdraw from "./components/Withdraw";
import Alldata from "./components/Alldata";
import FlashMessages from "./components/FlashMessages";
import FetchBalance from "./components/FetchBalance";

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("complexappToken")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("complexappToken"),
      username: localStorage.getItem("complexappUsername"),
      avatar: localStorage.getItem("complexappAvatar")
    }
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        draft.user = action.data;
        return;
      case "logout":
        draft.loggedIn = false;
        return;
      case "flashMessage":
        draft.flashMessages.push(action.value);
        return;
    }
  }
  // these two power the entire app (basically)
  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("complexappToken", state.user.token);
      localStorage.setItem("complexappUsername", state.user.username);
      localStorage.setItem("complexappAvatar", state.user.avatar);
    } else {
      localStorage.removeItem("complexappToken");
      localStorage.removeItem("complexappUsername");
      localStorage.removeItem("complexappAvatar");
    }
  }, [state.loggedIn]);

  // check if token has expired or not on first render
  useEffect(() => {
    if (state.loggedIn) {
      const ourRequest = Axios.CancelToken.source();
      async function fetchResults() {
        try {
          const response = await xios.post("/checkToken", { token: state.user.token });
          if (!response.data) {
            dispatch({ type: "logout" });
            dispatch({ type: "flashMessage", value: "Your session has expired. Please login again" });
          }
        } catch (e) {
          console.log("There was a problem or the request was canceled" + e);
        }
      }
      fetchResults();
      return () => ourRequest.cancel();
    }
  }, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Routes>
            <Route path="/alldata/:username" element={<Alldata />} />
            <Route path="/" element={state.loggedIn ? <Home /> : <HomeGuest />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/deposit/:username/" element={<Deposit />} />
            <Route path="/withdraw/:username/" element={<Withdraw />} />
            <Route path="/fetch/:username/" element={<FetchBalance />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default Main;

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<Main />);

if (module.hot) {
  module.hot.accept();
}
