import React from "react";
//@ts-check
import { Outlet, useLoaderData } from "react-router-dom";
import PostList from "../components/PostList";
import { useState, useEffect } from "react";

function Posts() {
  const initialPosts = useLoaderData();
  const [posts, setPosts] = useState(initialPosts);

  // Keep posts state in sync with loader data
  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

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

      setPosts((prevPosts) => [data.post, ...prevPosts]);
    } catch (error) {
      console.error("Error adding post:", error);
      throw error;
    }
  };

  return (
    <>
      <main>
        <PostList posts={posts}/>
      </main>
      <Outlet context={{ addPostHandler }} />
    </>
  );
}

export default Posts;

export async function loader() {
  const response = await fetch("http://localhost:8080/posts");
  const data = await response.json();
  return data.posts || [];
}