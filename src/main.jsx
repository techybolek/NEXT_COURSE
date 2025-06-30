import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./routes/RootLayout";
import Posts from "./routes/Posts";
import NewPost from "./routes/NewPost";
import { loader as postsLoader } from "./routes/Posts";
import { action  as newPostAction } from "./routes/NewPost";
import EditPost, { loader as singlePostLoader, action as editPostAction } from "./routes/EditPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Posts />,
        loader: postsLoader,
        children: [
          { path: "create-post", element: <NewPost />, action: newPostAction },
          { path: "edit-post/:id", element: <EditPost />, loader: singlePostLoader, action: editPostAction },
        ],
      },
    ],
  },
  { path: "/test-route", element: <h1>Hello World</h1> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
