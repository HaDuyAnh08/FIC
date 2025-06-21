import type { Book } from '../types';
import axios from 'axios';

// Create an Axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Matches backend /api/books
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const bookApi = {
  getBooks: async (): Promise<Book[]> => {
    try {
      const response = await api.get('/books');
      // Normalize response to array
      const books = Array.isArray(response.data) ? response.data : [];
      return books;
    } catch (error) {
      console.error('Error fetching all books:', error);
      throw error;
    }
  },

  getBookById: async (id: string): Promise<Book | undefined> => {
    try {
      const response = await api.get(`/books/${id}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return undefined;
      }
      console.error(`Error fetching book with id ${id}:`, error);
      throw error;
    }
  },

  getSuggestedBooks: async (genre: string, currentBookId: string): Promise<Book[]> => {
    try {
      const response = await api.get('/books/suggested', {
        params: {
          genre,
          currentBookId,
          limit: 4,
        },
      });
      // Normalize response to array
      const books = Array.isArray(response.data) ? response.data : [];
      return books;
    } catch (error) {
      console.error(`Error fetching suggested books for genre ${genre}:`, error);
      throw error;
    }
  },
};