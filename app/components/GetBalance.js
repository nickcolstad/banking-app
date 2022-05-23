import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

function GetBalance() {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  // const [balance, setBalance] = useState();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`);
        setPosts(response.data);
        getter(posts);
        console.log("Posts received");
      } catch (e) {
        console.log("There was a problem", e);
      }
    }
    fetchPosts();
  }, []);

  function getter(posts) {
    const testArray = posts;
    console.log(testArray);
  }

  // console.log("GetBalance = " + parseInt(posts[0].body));
  // console.log("Get Balance Posts length " + posts.length);
  // var total = 0;

  // for (let i = 0; i < posts.length; i++) {
  //   total += parseInt(posts[i].body);
  // }

  // const currentBalance = total;
  // console.log(currentBalance);

  return <div>Current Balance</div>;
}

export default GetBalance;
