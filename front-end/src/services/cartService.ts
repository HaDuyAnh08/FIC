import axiosInstance from "./axios";
import type { Book } from "../types/bookType";

export const addToCart = async (
  bookId: string,
  token: string
): Promise<void> => {
  await axiosInstance.post(
    "/cart/add",
    { bookId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const getCartItems = async (token: string): Promise<Book[]> => {
  const response = await axiosInstance.get("/cart", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.map((book: any) => ({
    id: book._id,
    name: book.name,
    author: book.author,
    genre: book.genre,
    rentalPrice: book.rentalPrice,
    stockStatus: book.stockStatus,
    image: book.image || "https://via.placeholder.com/150",
    yearPublished: book.yearPublished,
    detail: book.detail,
    quantity: book.quantity || 1,
  }));
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
  const response = await axiosInstance.get("/rentals", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.map((book: any) => ({
    id: book._id,
    name: book.name,
    author: book.author,
    genre: book.genre,
    rentalPrice: book.rentalPrice,
    stockStatus: book.stockStatus,
    image: book.image || "https://via.placeholder.com/150",
    yearPublished: book.yearPublished,
    detail: book.detail,
    quantity: book.quantity || 1,
  }));
};
