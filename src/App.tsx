import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./routes/products";
import Product from "./routes/product";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
