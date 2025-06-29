import { Outlet } from "react-router-dom";
import PostList from "../components/PostList";

function Posts() {

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
        <PostList/>
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