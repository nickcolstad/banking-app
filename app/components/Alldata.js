import React, { useEffect, useContext, useState } from "react";
import Page from "./Page";
import { useParams } from "react-router-dom";
import Axios from "axios";
import StateContext from "../StateContext";
import Transactions from "./Transactions";

function Alldata() {
  const { username } = useParams();
  const appState = useContext(StateContext);
  const [profileData, setProfileData] = useState({
    profileUsername: "...",
    profileAvatar: "https://gravatar.com/avatar/placeholder?s=128",
    counts: { postCount: "", followerCount: "", followingCount: "" }
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await Axios.post(`/profile/${username}`, { token: appState.user.token });
        setProfileData(response.data);
      } catch (e) {
        console.log("There was a problemo");
      }
    }
    fetchData();
  }, []);

  // img styling
  const style = {
    width: "32px",
    height: "32px",
    borderRadius: "16px"
  };

  return (
    <Page title="All-Data">
      <h2>
        <img className="avatar-small" src={profileData.profileAvatar} /> {profileData.profileUsername}
        <button className="btn btn-primary btn-sm ml-2">
          Follow <i className="fas fa-user-plus"></i>
        </button>
      </h2>

      <div className="profile-nav nav nav-tabs pt-2 mb-4">
        <a href="#" className="active nav-item nav-link">
          Transactions: {profileData.counts.postCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Account Info {profileData.counts.followerCount}
        </a>
        <a href="#" className="nav-item nav-link">
          Withdrawls: {profileData.counts.followingCount}
        </a>
      </div>
      <Transactions />
    </Page>
  );
}

export default Alldata;
