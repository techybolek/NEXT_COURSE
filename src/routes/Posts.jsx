import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import PostList from "../components/PostList";

function Posts() {
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
      <main>
        <PostList posts={posts} isFetching={isFetching} />
      </main>
      <Outlet context={{ addPostHandler }} />
    </>
  );
}

export default Posts;
