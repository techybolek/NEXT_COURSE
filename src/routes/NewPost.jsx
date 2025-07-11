import Modal from "../components/Modal";
import { Form, redirect, Link, useNavigation } from "react-router-dom";
import classes from "./NewPost.module.css";

function NewPost() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isLoading = navigation.state === "loading";

  console.log("NewPost");

  return (
    <Modal>
      {isLoading ? (
        <div className={classes.loading}>
          <h2>Loading posts...</h2>
          <div className={classes.spinner}></div>
        </div>
      ) : (
        <Form method="post" className={classes.form}>
          <h2>Create a New Post</h2>
          <div>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" name="author" required disabled={isSubmitting} />
          </div>
          <div>
            <label htmlFor="body">Body</label>
            <textarea id="body" name="body" rows="4" required disabled={isSubmitting} />
          </div>
          <div className={classes.actions}>
            <Link to='..' className={classes.actions}>
              Cancel
            </Link>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Add Post"}
            </button>
          </div>
        </Form>
      )}
    </Modal>
  );
}

export default NewPost;

export async function action({ request }) {
  try {
    console.log('NewPost: Creating post');
    const formData = await request.formData();
    const postData = Object.fromEntries(formData.entries());

    const response = await fetch("http://localhost:8080/posts", {
      method: "POST",
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