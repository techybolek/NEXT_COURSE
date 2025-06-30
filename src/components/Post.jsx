import classes from "./Post.module.css";

const names = ["John", "Jane", "Doe"];

function Post(props) {
    return (
        <li className={classes.post} onClick={props.onClick} style={{ cursor: 'pointer' }}>
            <p className={classes.author}>Author: {props.author}</p>
            <p className={classes.body}>Message: {props.body}</p>
        </li>
    )
}

export default Post;