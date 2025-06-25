import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Typography, Image, Spin, Alert } from 'antd';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getBookById } from '../services/bookService';
import type { Book } from '../types';
import { isAuthenticated } from '../utils/auth';

const { Title, Paragraph } = Typography;

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!id) {
        setError('Invalid book ID');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const bookData = await getBookById(id);
        if (!bookData) {
          setError('Book not found');
          setBook(null);
          setLoading(false);
          return;
        }

        setBook(bookData);
      } catch (err) {
        setError('Failed to load book details. Please try again later.');
        console.error('Error fetching book details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', marginTop: '80px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '80px auto 0' }}>
        <Alert message={error || 'Book not found'} type="error" showIcon />
      </div>
    );
  }

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '80px auto 0' }}>
        <Row gutter={[32, 32]}>
          <Col xs={24} md={8}>
            <Image
              src={book.image || 'https://via.placeholder.com/150'}
              alt={`Cover of ${book.name || 'Unknown'} by ${book.author || 'Unknown'}`}
              preview={false}
              style={{ maxWidth: '100%' }}
            />
          </Col>
          <Col xs={24} md={16}>
            <Title level={2}>{book.name || 'Unknown Title'}</Title>
            <Paragraph strong>Author: {book.author || 'Unknown Author'}</Paragraph>
            <Paragraph strong>Genre: {book.genre || 'N/A'}</Paragraph>
            <Paragraph strong style={{ fontSize: '18px' }}>
              ${book.rentalPrice ? book.rentalPrice.toFixed(2) : 'N/A'}
            </Paragraph>
            <Paragraph strong>Stock: {book.stockStatus || 'Unknown'}</Paragraph>
            {book.yearPublished && (
              <Paragraph>Published: {book.yearPublished}</Paragraph>
            )}
          </Col>
          </Row>
      </div>
      <Footer />
    </div>
  );
};

export default BookDetail;