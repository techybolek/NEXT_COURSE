import Post from "./Post";
import classes from "./PostsList.module.css";

function PostList({ posts }) {

  return (
    <>
      <ul className={classes.posts}>
        {posts.map((post) => (
          <Post key={post.id} author={post.author} body={post.body} id={post.id} />
        ))}
      </ul>
    </>
  );
}

export default PostList;
