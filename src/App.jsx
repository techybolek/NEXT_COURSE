import PostList from "./components/PostsList";
import MainHeader from "./components/MainHeader";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isCreatePostRoute = location.pathname === '/create-post';

  return (
    <>
      <MainHeader />
      <PostList isModalOpen={isCreatePostRoute} />
    </>
  );
}

export default App;
