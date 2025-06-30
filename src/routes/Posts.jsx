import React from "react";
//@ts-check
import { Outlet, useLoaderData } from "react-router-dom";
import PostList from "../components/PostList";

function Posts() {
  const posts = useLoaderData();

  return (
    <>
      <main>
        <PostList posts={posts}/>
      </main>
      <Outlet/>
    </>
  );
}

export default Posts;

export async function loader() {
  console.log('Loading posts...')
  const response = await fetch("http://localhost:8080/posts");
  const data = await response.json();
  console.log('Posts loaded');
  return data.posts || [];
}