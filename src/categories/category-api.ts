import { API_URL } from "../services/api";
import type { Category } from "../types/types";

// Funktion för att hämta kategorier
export async function getCategories(): Promise<Category[]> {
  // const response = await fetch(`${API_URL}/categories`);
  const response = await fetch(`${API_URL}/api/Categories`);

  if (!response.ok) {
    throw new Error("Failed to load categories.");
  }

  return response.json();
}
