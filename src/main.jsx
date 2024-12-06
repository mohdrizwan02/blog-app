
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Signup from "./pages/Signup.jsx";
import { AuthLayout } from "./components";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { Provider } from "react-redux";
import Login from "./pages/Login.jsx";
import Blogs from "./pages/Blogs.jsx";
import {BlogPage} from "./pages/BlogPage.jsx";
import { MyBlogs } from "./pages/MyBlogs.jsx";
import AddBlog from "./pages/AddBlog.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element:<Home />,
       
      },
      {
        path:'add-blog',
        element :(
          <AuthLayout>
            <AddBlog/>
          </AuthLayout>
        )
      },
      {
        path:'blogs',
        element:(<AuthLayout>

          <Blogs/>
        </AuthLayout>)
      },
      {
        path:'blogs/:blogId',
        element:(
          <AuthLayout>
            <BlogPage/>

          </AuthLayout>
        )
      },
      {
        path:'my-blogs',
        element:(
          <AuthLayout>
            <MyBlogs/>

          </AuthLayout>
        )
      },

      {
        path: "signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },

      {
        path: "login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
