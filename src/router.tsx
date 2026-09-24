import { createBrowserRouter } from "react-router-dom";
import Home from "./routes/home";
import Products from "./routes/products";
import Product from "./routes/product";
import Login from "./routes/login";


export const router = createBrowserRouter([
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
    path: "/login",
    element: <Login />,
  },
]);
