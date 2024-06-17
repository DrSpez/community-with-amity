import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./screens/App";
import PostDetails from "./screens/PostDetails";

import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AmityAuthProvider from "./providers/AmityAuthProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/post/:postID",
    element: <PostDetails />,
  },
]);

root.render(
  <React.StrictMode>
    <AmityAuthProvider>
      <RouterProvider router={router} />
    </AmityAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
