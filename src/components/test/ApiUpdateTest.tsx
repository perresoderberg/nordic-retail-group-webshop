import { useState } from "react";
import { supabase } from "../../services/supabase";

export default function ApiUpdateTest() {
  const [message, setMessage] = useState("");

  // Testar att uppdatera en produkt via backend
  async function handleUpdate() {
    setMessage("Uppdaterar...");

    // Hämtar den befintliga Supabase-sessionen
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;

    if (!token) {
      setMessage("Ingen access token hittades.");
      return;
    }

    // Produkt 1 med stock ändrat från 99 till 98
    const updatedProduct = {
      title: "Essence Mascara Lash Princess",
      description:
        "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects.",
      price: 9.99,
      discountPercentage: 10.48,
      stock: 98,
      brand: "Essence",
      weight: 4,
      warrantyInformation: "1 week warranty",
      shippingInformation: "Ships in 3-5 business days",
      availabilityStatus: "In Stock",
      returnPolicy: "No return policy",
      minimumOrderQuantity: 48,
      thumbnail:
        "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
      categoryId: 1,
    };

    try {
      const response = await fetch(
        "https://nordic-retail-group-webshop-backend.onrender.com/api/Products/1",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedProduct),
        },
      );

      if (!response.ok) {
        setMessage(`Update misslyckades: ${response.status}`);
        return;
      }

      setMessage("Produkten uppdaterades!");
    } catch {
      setMessage("Något gick fel vid API-anropet.");
    }
  }

  return (
    <div>
      <button type="button" onClick={handleUpdate}>
        Testa update product
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}