import { API_URL, apiFetch } from "../services/api";
import { LowStock } from "../constants/inventory";
import type { Product, ProductsResponse } from "./types";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 8;

// Beskriver vilka filter som kan skickas till API-anropet
type ProductAdminFilters = {
  search?: string;
  categoryId?: string;
  stock?: string;
  sort?: string;
  order?: "asc" | "desc";
};

export type ProductFilters = {
  search?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  ascending?: boolean;
};

// Hämtar en produkt utifrån produktens id
export async function getProductById(id: number): Promise<Product> {
  const response = await apiFetch(`${API_URL}/api/Products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to load product.");
  }

  return response.json();
}

// For the Web page

export async function getProducts(
  page: number = DEFAULT_PAGE,
  pageSize: number = DEFAULT_PAGE_SIZE,
  filters: ProductFilters = {},
): Promise<ProductsResponse> {
  const params = new URLSearchParams({
    Page: page.toString(),
    PageSize: pageSize.toString(),
    Ascending: (filters.ascending ?? true).toString(),
  });

  if (filters.search) {
    params.set("Search", filters.search);
  }

  if (filters.categoryId !== undefined) {
    params.set("CategoryId", filters.categoryId.toString());
  }

  if (filters.minPrice !== undefined) {
    params.set("MinPrice", filters.minPrice.toString());
  }

  if (filters.maxPrice !== undefined) {
    params.set("MaxPrice", filters.maxPrice.toString());
  }

  if (filters.sortBy) {
    params.set("SortBy", filters.sortBy);
  }

  const response = await apiFetch(`/api/Products?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to load products.");
  }

  return response.json();
}

// For the admin
export async function getAdminProducts(
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_PAGE_SIZE,
  filters: ProductAdminFilters = {},
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

  const response = await apiFetch(`/products?${params.toString()}`);

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
