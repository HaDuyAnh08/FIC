import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import type { BookList } from '../../data/types';
import axiosInstance from '../../api/axios';



// CSS thuần
const styles = `
  .book-section {
    padding: 1.5rem 1rem;
    background-color: #fafafa;
  }
  .book-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem;
  }
  .book-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    text-align: left;
    margin-bottom: 1rem;
  }
  .book-grid {
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    gap: 1rem;
    padding-bottom: 0.5rem;
  }
  .book-card {
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    width: 220px;
    min-height: 300px;
    flex-shrink: 0;
    border: 1px solid #e5e7eb;
  }
  .book-image-container {
    height: 192px;
    background-color: #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .book-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .book-content {
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .book-card-title {
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .book-genre {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 0.125rem;
  }
  .book-author {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 0.125rem;
  }
  .book-year {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 0.125rem;
  }
  .book-price {
    font-size: 1rem;
    font-weight: 600;
    color: #4b5563;
    margin-top: 0.25rem;
  }
  .book-stock {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 0.125rem;
  }
  .book-button {
    background-color: #3b82f6;
    color: white;
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    transition: background-color 0.2s;
    margin-top: 0.25rem;
  }
  .book-button:hover {
    background-color: #2563eb;
  }
  .book-loading {
    text-align: center;
    padding: 1rem;
    color: #6b7280;
  }
  .book-error {
    text-align: center;
    padding: 1rem;
    color: #dc2626;
  }
`;

// BookRecommendation Component
export const BookRecommendation: React.FC = () => {
  const [books, setBooks] = useState<BookList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        //const response = await axios.get('http://localhost:5000/api/books'); // Thay đổi port nếu cần
        const response = await axiosInstance.get('/api/books');

        console.log('API response:', response.data); // Debug
        const formattedBooks = Array.isArray(response.data)
          ? response.data.map((book: any, index: number) => ({
              id: book.id ? book.id.toString() : `book-${index}`,
              name: book.name || book.title || undefined,
              genre: book.genre || book.category || undefined,
              author: book.author || undefined,
              yearPublished: book.yearPublished || undefined,
              rentalPrice: book.rentalPrice || undefined,
              stockStatus: book.stockStatus || undefined,
            }))
          : [];
        setBooks(formattedBooks);
        setLoading(false);
      } catch (err) {
        console.error('API error:', err);
        setError('Failed to load books.');
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) {
    return <div className="book-loading">Loading books...</div>;
  }

  if (error) {
    return <div className="book-error">{error}</div>;
  }

  if (books.length === 0) {
    return (
      <section className="book-section">
        <style>{styles}</style>
        <div className="book-container">
          <h2 className="book-title">Recommended Books</h2>
          <p className="no-books">No books available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="book-section">
      <style>{styles}</style>
      <div className="book-container">
        <h2 className="book-title">Recommended Books</h2>
        <div className="book-grid">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-image-container">
                <img src="https://via.placeholder.com/150?text=" alt={book.name || 'Book'} className="book-image" />
              </div>
              <div className="book-content">
                <h3 className="book-card-title">{book.name || 'Untitled'}</h3>
                <p className="book-genre">{book.genre || 'Unknown'}</p>
                <p className="book-author">by {book.author || 'Unknown'}</p>
                <p className="book-year">{book.yearPublished ? book.yearPublished.toString() : 'Unknown'}</p>
                <p className="book-price">{book.rentalPrice ? `$${book.rentalPrice.toFixed(2)}` : 'Unknown'}</p>
                <p className="book-stock">{book.stockStatus !== undefined ? `Stock: ${book.stockStatus}` : 'Unknown'}</p>
                <button className="book-button">Rent</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};