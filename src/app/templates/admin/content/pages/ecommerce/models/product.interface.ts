export interface Product {
  id?: string;
  name: string;
  img?: string;
  category: string;
  stock: number;
  price: number;
  salePerDay: number;
  salePerMonth: number;
  rating: number;
  sales: number;
  revenue: number;
  lastUpdate?: string;
}
