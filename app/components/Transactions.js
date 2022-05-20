import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Axios from "axios";

function Transactions() {
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`);
        setPosts(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log("There was a problem");
      }
    }
    fetchPosts();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
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
  );
}

export default Transactions;
