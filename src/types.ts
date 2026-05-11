export interface Product {
  id: string;
  name: string;
  price: number;
  discount: number;
  popular: boolean;
  bonus: number;
  image: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  balance: number;
  role: "user" | "admin";
}

export interface Order {
  id: string;
  userId: string;
  gameId: string;
  nickname: string;
  productId: string;
  productName: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}
