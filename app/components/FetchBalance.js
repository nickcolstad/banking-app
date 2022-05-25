import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useImmer } from "use-immer";

function FetchBalance() {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [state, setState] = useImmer({
    isLoading: true,
    feed: []
  });

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`);
        setPosts(response.data);
        console.log("FetchBalance data received");
        // setIsLoading(false);
        setState(draft => {
          draft.isLoading = false;
          draft.feed = response.data;
        });
      } catch (e) {
        console.log("There was a problem on withdraw data fetch" + e);
      }
    }
    fetchPosts();
  }, []);

  function addBalance(posts) {
    var bal = 0;
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].title == "Deposit") {
        bal += parseInt(posts[i].body);
      } else {
        bal -= parseInt(posts[i].body);
      }
    }
    console.log(bal);
    return bal;
  }
  return <>{addBalance(posts)}</>;
}

export default FetchBalance;
