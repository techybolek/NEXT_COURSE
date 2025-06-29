import { useNavigate, useOutletContext } from 'react-router-dom';
import Modal from '../components/Modal';
import NewPostInner from '../components/NewPostInner';

function NewPost() {
  const navigate = useNavigate();
  const { addPostHandler } = useOutletContext();

  const handleClose = () => {
    navigate('/');
  };

  const handleAddPost = async (newPost) => {
    await addPostHandler(newPost);
    navigate('/');
  };

  console.log('NewPost');

  return (
    <>
      <Modal onClose={handleClose}>
        <NewPostInner onAddPost={handleAddPost} onCancel={handleClose} />
      </Modal>
    </>
  );
}

export default NewPost; 