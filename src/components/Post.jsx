import classes from "./Post.module.css";
import { Link } from "react-router-dom";
import { encodeUrlId } from '../utils/urlUtils';

function Post(props) {
    return (
        <li className={classes.post} style={{ cursor: 'pointer' }}>
            <Link to={`/${encodeUrlId(props.id)}`}>
                <p className={classes.author}>Author: {props.author}</p>
                <p className={classes.body}>Message: {props.body}</p>
            </Link>
        </li>
    )
}

export default Post;