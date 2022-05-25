import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";

function Transactions() {
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [balance, setBalance] = useState();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`);
        setPosts(response.data);
        setBalance(response.data);
        setIsLoading(false);
        addBalance(balance);
      } catch (e) {
        console.log("There was a problem");
      }
    }
    fetchPosts();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  console.log("Transactions Posts = " + parseInt(posts[0].body));
  console.log("Posts length " + posts.length);
  var total = 0;

  function addBalance(balance) {
    for (let i = 0; i < balance.length; i++) {
      total += parseInt(balance[i].body);
    }
  }

  return (
    <div className="list-group">
      <div>Total is: {total}</div>
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
  );
}

export default Transactions;
