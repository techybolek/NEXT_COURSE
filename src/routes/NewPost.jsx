import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import { Form, redirect } from "react-router-dom";
import classes from "./NewPost.module.css";

function NewPost() {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  console.log("NewPost");

  return (
    <Modal onClose={handleClose}>
      <Form method="post" className={classes.form}>
        <h2>Create a New Post</h2>
        <div>
          <label htmlFor="author">Author</label>
          <input type="text" id="author" name="author" required />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <textarea id="body" name="body" rows="4" required />
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={handleClose}>
            Cancel
          </button>
          <button type="submit">Add Post</button>
        </div>
      </Form>
    </Modal>
  );
}

export default NewPost;

export async function action({ request }) {
  try {
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
    return redirect('/');
  } catch (error) {
    return { error: error.message };
  }
}