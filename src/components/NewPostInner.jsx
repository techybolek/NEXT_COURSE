import { useState } from 'react';
import classes from './NewPost.module.css';
import { useNavigate } from 'react-router-dom';

function NewPostInner({ onAddPost }) {
    const navigate = useNavigate();
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        if (author.trim() && body.trim()) {
            onAddPost({ author, body });
            setAuthor('');
            setBody('');
        }
    };


    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <h2>Create a New Post</h2>
            <div>
                <label htmlFor="author">Author</label>
                <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="body">Body</label>
                <textarea
                    id="body"
                    rows="4"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                />
            </div>
            <div className={classes.actions}>
                <button type="button">Cancel</button>
                <button type="submit">Add Post</button>
            </div>
        </form>
    );
}

export default NewPostInner;
