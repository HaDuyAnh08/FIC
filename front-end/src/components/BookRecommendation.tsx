import React, { useEffect, useState } from 'react';
import { Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useBook } from '../hooks/BookContext';
import type { Book } from '../types/bookType';

const { Title } = Typography;

interface BookRecommendationProps {
  currentBookId: string;
  genre: string;
}

const BookRecommendation: React.FC<BookRecommendationProps> = ({ currentBookId, genre }) => {
  const { books } = useBook();
  const navigate = useNavigate();
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);

  // Xáo trộn ngẫu nhiên và lấy 3 sách khi currentBookId thay đổi
  useEffect(() => {
    const filteredBooks = books.filter((book) => book.genre === genre && book.id !== currentBookId);
    const shuffleArray = (array: Book[]) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };
    setRecommendedBooks(shuffleArray(filteredBooks).slice(0, 3));
  }, [currentBookId, genre, books]);

  if (recommendedBooks.length === 0) {
    return null;
  }

  return (
    <div style={{ marginTop: '40px' }}>
      <Title level={3}>Sách Đề Xuất</Title>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        {recommendedBooks.map((book) => (
          <Card
            key={book.id}
            hoverable
            className="book-card"
            style={{
              width: 240,
              textAlign: 'center',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              border: '1px solid #e8e8e8',
              background: '#fff',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            cover={
              <div
                style={{
                  width: '100%',
                  height: '300px',
                  overflow: 'hidden',
                  background: '#f7f7f7',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  alt={book.name || 'Unknown'}
                  src={book.image || 'https://via.placeholder.com/200x300'}
                  style={{
                    width: '100%',
                    height: '300px',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    transition: 'transform 0.3s',
                  }}
                />
              </div>
            }
            onClick={() => navigate(`/book/${book.id}`)}
          >
            <h3
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#333',
                margin: '10px 0',
              }}
            >
              {book.name || 'Unknown Title'}
            </h3>
            <p style={{ fontSize: '16px', color: '#666', margin: '5px 0' }}>
              By {book.author || 'Unknown Author'}
            </p>
          </Card>
        ))}
      </div>
      <style>
        {`
          .book-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
          }
          .book-card:hover img {
            transform: scale(1.03);
          }
          @media (max-width: 768px) {
            .book-card {
              width: 100%;
              max-width: 280px;
              margin: 0 auto;
            }
            .book-card img {
              height: 280px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default BookRecommendation;