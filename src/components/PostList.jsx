import { useState, useEffect } from "react";
import Post from "./Post";
import classes from "./PostsList.module.css";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsFetching(true);
        const response = await fetch("http://localhost:8080/posts");
        const data = await response.json();
        setPosts(data.posts || []);
        setIsFetching(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setIsFetching(false);
      }
    }
    fetchPosts();
  }, []);

  const addPostHandler = async (newPost) => {
    try {
      const response = await fetch("http://localhost:8080/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
      const data = await response.json();

      setPosts((prevPosts) => [
        { id: prevPosts.length + 1, ...newPost },
        ...prevPosts,
      ]);
    } catch (error) {
      console.error("Error adding post:", error);
      throw error;
    }
  };

  return (
    <>
      {isFetching && <p>Loading posts...</p>}
      {posts?.length > 0 && !isFetching && (
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.id} author={post.author} body={post.body} />
          ))}
        </ul>
      )}
    </>
  );
}

export default PostList;
