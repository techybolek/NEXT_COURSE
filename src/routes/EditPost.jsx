import Modal from "../components/Modal";
import { Form, redirect, Link, useLoaderData, useNavigation } from "react-router-dom";
import classes from "./NewPost.module.css";

function EditPost() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isLoading = navigation.state === "loading";
  const post = useLoaderData();

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
    
    return  redirect('/');
  } catch (error) {
    return { error: error.message };
  }
}

export async function loader({ params }) {
  const response = await fetch("http://localhost:8080/posts/" + params.id);
  const data = await response.json();
  console.log('EditPost: Post loaded', data);
  return data;
}