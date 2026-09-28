import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./routes/home";
import Login from "./routes/login";
import Basket from "./routes/basket";
import { Products } from "./routes/products";
import Product from "./routes/product";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
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
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
