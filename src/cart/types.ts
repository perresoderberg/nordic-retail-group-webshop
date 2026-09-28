export interface CartItem {
  productId: number;
  title: string;
  price: number;
  thumbnail: string | null;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
}
