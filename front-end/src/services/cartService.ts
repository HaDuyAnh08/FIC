import axiosInstance from "./axios";
import type { Book } from "../types/bookType";

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

export const getCartItems = async (token: string): Promise<Book[]> => {
  try {
    const response = await axiosInstance.get("/cart", {
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
