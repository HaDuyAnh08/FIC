export interface Book {
  id: string;
  title: string;
  genre: string; // Changed from category to genre
  author: string;
  yearPublished: number;
  price: number;
  stockStatus: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
}