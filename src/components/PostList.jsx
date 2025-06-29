import Post from "./Post";
import classes from "./PostsList.module.css";
import { useLoaderData } from "react-router-dom";
//use get posts from loader data

function PostList() {
  const posts = useLoaderData();
  return (
    <>
        <ul className={classes.posts}>
          {posts.map((post) => (
            <Post key={post.id} author={post.author} body={post.body} />
          ))}
        </ul>
    </>
  );
}

export default PostList;
