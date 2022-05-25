import React, { useEffect, useContext, useState } from "react";
import Page from "./Page";
import { useParams } from "react-router-dom";
import Axios from "axios";
import StateContext from "../StateContext";
import { useImmer } from "use-immer";

function Alldata() {
  const [profileData, setProfileData] = useState({
    profileUsername: "...",
    profileAvatar: "https://gravatar.com/avatar/placeholder?s=128",
    counts: { postCount: "" }
  });
  // const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { username } = useParams();
  const appState = useContext(StateContext);
  const [state, setState] = useImmer({
    isLoading: true,
    feed: []
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

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`);
        setPosts(response.data);
        // setIsLoading(false);
        setState(draft => {
          draft.isLoading = false;
          draft.feed = response.data;
        });
      } catch (e) {
        console.log("There was a problem");
      }
    }
    fetchPosts();
  }, []);

  console.log(posts);

  function addBalance(prop) {
    var bal = 0;
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].title == "Deposit") {
        bal += parseInt(posts[i].body);
      } else {
        bal -= parseInt(posts[i].body);
      }
    }
    return bal;
  }

  if (state.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Page title="All-Data">
      {state.feed.length > 0 && (
        <>
          <h2>
            <img className="avatar-small" src={profileData.profileAvatar} /> {profileData.profileUsername}
          </h2>

          <div className="profile-nav nav nav-tabs pt-2 mb-4">
            <a href="#" className="active nav-item nav-link">
              Transactions: {profileData.counts.postCount}
            </a>
            <a href="" className="nav-item nav-link">
              Current Balance: ${addBalance(posts)}
            </a>
          </div>
          {/* Transactions */}
          <div className="list-group">
            {posts.map(post => {
              const date = new Date(post.createdDate);
              const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

              return (
                <a key={post._id} href="" className="list-group-item list-group-item-action">
                  <strong>{post.title}</strong>
                  <span className="text-muted "> ${post.body}</span> <span className="text-muted small">on {dateFormatted} </span>
                </a>
              );
            })}
          </div>
        </>
      )}

      {state.feed.length == 0 && (
        <>
          <h2>
            <img className="avatar-small" src={profileData.profileAvatar} /> {profileData.profileUsername}
          </h2>
          <div className="profile-nav nav nav-tabs pt-2 mb-4">
            <a href="#" className="active nav-item nav-link">
              Transactions: {profileData.counts.postCount}
            </a>
          </div>
          <div>No transactions yet</div>
        </>
      )}
    </Page>
  );
}

export default Alldata;
