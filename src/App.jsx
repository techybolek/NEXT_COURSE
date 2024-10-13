import PostList from "./components/PostsList";
import MainHeader from "./components/MainHeader";
import { useState } from "react";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModalHandler = () => setIsModalOpen(true);
  const closeModalHandler = () => setIsModalOpen(false);

  return (
    <>
      <MainHeader onCreatePost={openModalHandler} />
      <PostList isModalOpen={isModalOpen} onCloseModal={closeModalHandler} />
    </>
  );
}

export default App;
