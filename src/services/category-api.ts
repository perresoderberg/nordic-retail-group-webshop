import { API_URL } from "./api";
import type { Category } from "../types/category";

// Funktion för att hämta kategorier
export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/categories`);

  if (!response.ok) {
    throw new Error("Failed to load categories.");
  }

  return response.json();
}
