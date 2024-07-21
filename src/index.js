import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AllPosts from "./pages/AllPosts";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import { Protected } from "./components";

const router = createBrowserRouter(
  createRoutesFromElements(
    // Using the 2nd Format!!
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      {/* 22:40 {L26} -> From next element onwards, we need to add authLayout/Protected wrapper which we created! */}
      <Route
        path="/login"
        element={
          <Protected authentication={false}>
            <Login />
          </Protected>
        }
      />
      <Route
        path="/signup"
        element={
          <Protected authentication={false}>
            <Signup />
          </Protected>
        }
      />
      <Route
        path="/all-posts"
        element={
          <Protected authentication>
            <AllPosts />
          </Protected>
        }
      />
      <Route
        path="/add-post"
        element={
          <Protected authentication>
            <AddPost />
          </Protected>
        }
      />
      <Route
        path="/edit-post/:slug"
        element={
          <Protected authentication>
            <EditPost />
          </Protected>
        }
      />
      <Route
        path="/post/:slug"
        element={
          <Protected >
            <Post />
          </Protected>
        }
      />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
