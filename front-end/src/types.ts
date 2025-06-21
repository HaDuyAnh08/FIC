export interface Book {
  _id: string;
  name: string;
  genre: string;
  author: string;
  yearPublished?: number;
  rentalPrice: number;
  stockStatus: 'in stock' | 'out of stock';
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem extends Book {
  quantity: number;
}