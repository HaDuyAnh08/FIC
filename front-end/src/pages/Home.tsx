import { useEffect, useState } from 'react';
import { Row, Col, Typography, Spin, Alert } from 'antd';
import BookCard from '../components/BookCard';
import { bookApi } from '../api/bookApi';
import type { Book } from '../types';

const { Title } = Typography;

const Home: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await bookApi.getBooks();
        setBooks(data); // bookApi ensures data is an array
        setError(null);
      } catch (err) {
        setError('Failed to fetch books. Please try again later.');
        console.error('Error in fetchBooks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Title level={2}>Book Rental</Title>
      {error && <Alert message={error} type="error" showIcon className="mb-4" />}
      {loading ? (
        <div className="flex justify-center">
          <Spin size="large" />
        </div>
      ) : books.length === 0 ? (
        <Alert message="No books available" type="info" showIcon />
      ) : (
        <Row gutter={[16, 16]}>
          {books.map((book) => (
            <Col xs={24} sm={12} md={8} lg={6} key={book._id}>
              <BookCard book={book} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Home;