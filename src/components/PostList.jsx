import Post from "./Post";
import classes from "./PostsList.module.css";

function PostList({ posts, isFetching }) {
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
