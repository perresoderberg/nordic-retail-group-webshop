import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductDetails from "../products/components/ProductDetails";
import { getProductById } from "../products/product-api";
import type { Product as ProductType } from "../products/types";

function Product() {
  // Hämtar produktens id från URL:en
  const { id } = useParams();

  // Sparar produkten som hämtas från API:t
  const [product, setProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    // Hämtar rätt produkt utifrån id i URL:en
    async function loadProduct() {
      if (!id) {
        return;
      }

      const data = await getProductById(Number(id));
      setProduct(data);
    }

    loadProduct();
  }, [id]);

  // Visar inget produktinnehåll innan produkten har hämtats
  if (!product) {
    return <p>Produkten laddas...</p>;
  }

  return <ProductDetails product={product} />;
}

export default Product;