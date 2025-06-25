export interface CartItem {
  id: string;
  bookId: string;
  name: string;
  author: string;
  genre: string;
  rentalPrice: number;
  stockStatus: string;
  image: string;
  yearPublished: number;
  quantity: number;
  rentalDays: number;
}
