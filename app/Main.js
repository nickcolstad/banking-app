import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Axios from "axios";
Axios.defaults.baseURL = "http://localhost:8080";

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

function Main() {
  // Boolean keeps user logged in when browser refreshes by using the local storage token
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("complexappToken")));

  return (
    <BrowserRouter>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={loggedIn ? <Home /> : <HomeGuest />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/alldata" element={<Alldata />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Main;

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<Main />);

if (module.hot) {
  module.hot.accept();
}
