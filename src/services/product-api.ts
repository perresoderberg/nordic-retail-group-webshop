import { API_URL } from "./api";
import type { ProductsResponse } from "../types/product";
import { LowStock } from "../constants/inventory";

const DEFAULT_LIMIT = 8;

// Beskriver vilka filter som kan skickas till API-anropet
type ProductFilters = {
  search?: string;
  categoryId?: string;
  stock?: string;
  sort?: string;
  order?: "asc" | "desc";
};

// Hämtar produkter från API:t med paginering och valda filter
export async function getProducts(
  page: number = 1,
  limit: number = DEFAULT_LIMIT,
  filters: ProductFilters = {},
): Promise<ProductsResponse> {
  const params = new URLSearchParams({
    _page: page.toString(),
    _limit: limit.toString(),
    _sort: filters.sort ?? "id",
    _order: filters.order ?? "desc",
    _expand: "category",
  });

  if (filters.search) {
    params.set("title_like", filters.search);
  }

  if (filters.categoryId) {
    params.set("categoryId", filters.categoryId);
  }

  if (filters.stock === "out-of-stock") {
    params.set("stock", "0");
  }

  if (filters.stock === "low-stock") {
    params.set("stock_gte", "1");
    params.set("stock_lte", (LowStock - 1).toString());
  }

  if (filters.stock === "in-stock") {
    params.set("stock_gte", LowStock.toString());
  }

  const response = await fetch(`${API_URL}/products?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to load products.");
  }

  return response.json();
}

export async function getAllProducts(): Promise<ProductsResponse> {
  const response = await fetch(
    `${API_URL}/products?_sort=id&_order=desc&_expand=category`,
  );

  if (!response.ok) {
    throw new Error("Failed to load products.");
  }

  return response.json();
}

export async function deleteProduct(id: number): Promise<void> {
  const url = `${API_URL}/products/${id}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete product ${id}. HTTP ${response.status}`,
      );
    }
  } catch (error) {
    console.error("DELETE failed:", url, error);
    throw error;
  }
}
