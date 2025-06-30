import Post from "./Post";
import { useNavigate } from "react-router-dom";
import classes from "./PostsList.module.css";

function PostList({ posts }) {
  const navigate = useNavigate();

  return (
    <>
      <ul className={classes.posts}>
        {posts.map((post) => (
          <Post key={post.id} author={post.author} body={post.body} id={post.id} onClick={() => { console.log('PostList: Clicked post', post.id); navigate(`/edit-post/${post.id}`); }} />
        ))}
      </ul>
    </>
  );
}

export default PostList;
