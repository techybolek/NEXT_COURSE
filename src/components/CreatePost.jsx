import { useNavigate, useOutletContext } from 'react-router-dom';
import Modal from './Modal';
import NewPost from './NewPost';
import Posts from './Posts';

function CreatePost() {
  const navigate = useNavigate();
  const { addPostHandler } = useOutletContext();

  const handleClose = () => {
    navigate('/');
  };

  const handleAddPost = async (newPost) => {
    await addPostHandler(newPost);
    navigate('/');
  };

  return (
    <>
      <Posts />
      <Modal onClose={handleClose}>
        <NewPost onAddPost={handleAddPost} onCancel={handleClose} />
      </Modal>
    </>
  );
}

export default CreatePost; 