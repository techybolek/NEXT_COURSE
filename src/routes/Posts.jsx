import { Outlet } from "react-router-dom";
import PostList from "../components/PostList";

function Posts() {
  return (
    <>
      <main>
        <PostList />
      </main>
      <Outlet />
    </>
  );
}

export default Posts;
