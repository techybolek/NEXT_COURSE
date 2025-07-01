import Modal from "../components/Modal";
import { Form, redirect, Link, useLoaderData, useNavigation } from "react-router-dom";
import classes from "./NewPost.module.css";
import { decodeUrlId } from '../utils/urlUtils';

function EditPost() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isLoading = navigation.state === "loading";
  const post = useLoaderData();
  
  console.log('EditPost Component - Received post data:', post);
  console.log('EditPost Component - Post properties:', {
    id: post?.id,
    author: post?.author,
    body: post?.body
  });

  if (!post) {
    console.error('EditPost Component - No post data available');
    return <div>Error: Post data not found</div>;
  }

  return (
    <Modal>
      {isLoading ? (
        <div className={classes.loading}>
          <h2>Loading posts...</h2>
          <div className={classes.spinner}></div>
        </div>
      ) : (
        <Form method="put" className={classes.form}>
          <h2>Edit Post</h2>
          <input type="hidden" name="id" value={post.id} />
          <div>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" name="author" required disabled={isSubmitting} defaultValue={post.author} />
          </div>
          <div>
            <label htmlFor="body">Body</label>
            <textarea id="body" name="body" rows="4" required disabled={isSubmitting} defaultValue={post.body} />
          </div>
          <div className={classes.actions}>
            <Link to='..' className={classes.actions}>
              Cancel
            </Link>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Post"}
            </button>
          </div>
        </Form>
      )}
    </Modal>
  );
}

export default EditPost;

export async function action({ request }) {
  try {
    console.log('EditPost: Saving post');
    const formData = await request.formData();
    const postData = Object.fromEntries(formData.entries());
    console.log('EditPost: Post data:', postData);

    const response = await fetch("http://localhost:8080/posts/" + postData.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error('Failed to create post');
    }

    await response.json();
    console.log('NewPost: Post created');
    
    return redirect('/');
  } catch (error) {
    return { error: error.message };
  }
}

export async function loader({ params }) {
  console.log('EditPost Loader - Fetching post with ID:', params.id);
  const actualId = decodeUrlId(params.id);
  const response = await fetch("http://localhost:8080/posts/" + actualId);
  const data = await response.json();
  console.log('EditPost Loader - Raw response data:', data);
  return data.post;
}