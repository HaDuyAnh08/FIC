import axiosInstance from "./axios";
import type { Book } from "../types/bookType";
import type { CartItem } from "../types/cartType";
export const addToCart = async (
  bookId: string,
  token: string
): Promise<void> => {
  await axiosInstance.post(
    "/add",
    { bookId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const getCartItems = async (
  token: string
): Promise<CartItem[]> => {
  try {
    const { data } = await axiosInstance.get("/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });

    
    const items = Array.isArray(data) ? data : data.items ?? [];

    return items.map((item: any): CartItem => {
      const book = item.book ?? item; // 

      return {
        id: item._id,                 // 
        bookId: book._id,
        name: book.title ?? book.name,
        author: book.author,
        genre: book.genre,
        rentalPrice:
          book.rentalPricePerDay ?? book.rentalPrice ?? 0,
        stockStatus: book.stockStatus ?? "unknown",
        image:
          book.coverImage ??
          book.image ??
          "https://via.placeholder.com/150",
        yearPublished: book.yearPublished ?? 0,
        quantity: item.quantity ?? 1,
        rentalDays: item.rentalDays ?? 7,
      };
    });
  } catch (error) {
    console.error("Error in getCartItems:", error);
    return [];
  }
};

export const removeFromCart = async (
  bookId: string,
  token: string
): Promise<void> => {
  await axiosInstance.delete(`/cart/remove/${bookId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const checkout = async (
  bookIds: string[],
  token: string
): Promise<void> => {
  await axiosInstance.post(
    "/rentals/add",
    { bookIds },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const getRentalItems = async (token: string): Promise<Book[]> => {
  try {
    const response = await axiosInstance.get("/rentals", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = Array.isArray(response.data)
      ? response.data
      : response.data.items || [];
    return data.map((book: any) => ({
      id: book._id,
      name: book.name,
      author: book.author,
      genre: book.genre,
      rentalPrice: book.rentalPrice,
      stockStatus: book.stockStatus,
      image: book.image || "https://via.placeholder.com/150",
      yearPublished: book.yearPublished,
      quantity: book.quantity || 1,
    }));
  } catch (error) {
    console.error("Error in getRentalItems:", error);
    return [];
  }
};
