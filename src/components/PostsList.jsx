import { useState } from 'react';
import Post from "./Post";
import NewPost from "./NewPost";
import Modal from "./Modal";
import classes from "./PostsList.module.css";
import { useEffect } from 'react';

function PostList({ isModalOpen, onCloseModal }) {
    //retrieve the list of posts from http://localhost:8080/posts

    useEffect(() => {
        async function fetchPosts() {
            try {
                setIsFetching(true);
                const response = await fetch('http://localhost:8080/posts');
                const data = await response.json();
                setPosts(data.posts || []);
                setIsFetching(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }
        fetchPosts();
    }, []);

    const [posts, setPosts] = useState([])
    const [isFetching, setIsFetching] = useState(true);

    const addPostHandler = async (newPost) => {
        async function addPostToBackend(post) {
            try {
                const response = await fetch('http://localhost:8080/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(post),
                });
                const data = await response.json();
                return data.post;
            } catch (error) {
                console.error('Error adding post:', error);
                throw error;
            }
        }

        const addedPost = await addPostToBackend(newPost);
        setPosts((prevPosts) => [
            { id: prevPosts.length + 1, ...newPost },
            ...prevPosts,
        ]);
        onCloseModal();
    };

    return (
        <>
            {isModalOpen && (
                <Modal onClose={onCloseModal}>
                    <NewPost onAddPost={addPostHandler} onCancel={onCloseModal} />
                </Modal>
            )}
            {isFetching && <p>Loading posts...</p>}
            {posts?.length > 0 && !isFetching &&
                <ul className={classes.posts}>
                    {posts.map((post) => (
                        <Post key={post.id} author={post.author} body={post.body} />
                    ))}
                </ul>
            }
        </>
    );
}

export default PostList;