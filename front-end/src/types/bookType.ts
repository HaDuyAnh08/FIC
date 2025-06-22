export interface Book {
  id: string;
  name?: string;
  author?: string;
  genre?: string;
  rentalPrice?: number;
  stockStatus?: "in stock" | "out of stock";
  image?: string;
  yearPublished?: number;
  detail?: string;
}
