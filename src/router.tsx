import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./routes/home";
import Login from "./routes/login";
import Basket from "./routes/basket";
import { Products } from "./routes/products";
import Product from "./routes/product";
import Admin from "./routes/admin";
import About from "./routes/about";
import NotFoundPage from "./not-found/NotFoundPage";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <Product />,
      },
      {
        path: "/basket",
        element: <Basket />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
