import { useState } from 'react';
import classes from './NewPost.module.css';

function NewPost({ onAddPost, onCancel }) {
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
            <div>
                <label htmlFor="author">Author</label>
                <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="body">Body</label>
                <textarea
                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
            </div>
            <p className={classes.ations}>
                <button type="button" onClick={onCancel}>Cancel</button>
                <button type="submit">Add Post</button>
            </p>
        </form>
    );
}

export default NewPost;
