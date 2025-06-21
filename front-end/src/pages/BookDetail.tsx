import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Typography, Image, Space, Divider, Spin, Alert } from 'antd';
import BookCard from '../components/BookCard';
import BookQuantity from '../components/BookQuantity';
import AddToCartButton from '../components/AddToCartButton';
import { bookApi } from '../api/bookApi';
import type { Book } from '../types';

const { Title, Paragraph } = Typography;

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

        const bookData = await bookApi.getBookById(id);
        if (!bookData) {
          setError('Book not found');
          setBook(null);
          setLoading(false);
          return;
        }

        setBook(bookData);

        const suggested = await bookApi.getSuggestedBooks(bookData.genre, bookData._id);
        setSuggestedBooks(suggested);
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
      <div className="p-4 max-w-7xl mx-auto flex justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="p-4 max-w-7xl mx-auto">
        <Alert message={error || 'Book not found'} type="error" showIcon />
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Row gutter={[32, 32]}>
        <Col xs={24} md={8}>
          <Image
            src={book.image || 'https://via.placeholder.com/150'}
            alt={`Cover of ${book.name} by ${book.author}`}
            preview={false}
          />
        </Col>
        <Col xs={24} md={16}>
          <Title level={2}>{book.name}</Title>
          <Paragraph strong>Author: {book.author}</Paragraph>
          <Paragraph strong>Genre: {book.genre}</Paragraph>
          <Paragraph strong className="text-xl">
            ${book.rentalPrice.toFixed(2)}
          </Paragraph>
          <Paragraph strong>Stock: {book.stockStatus}</Paragraph>
          {book.yearPublished && <Paragraph>Published: {book.yearPublished}</Paragraph>}
          <Space size="middle" className="mb-4">
            <BookQuantity quantity={quantity} setQuantity={setQuantity} />
            <AddToCartButton book={book} quantity={quantity} />
          </Space>
        </Col>
      </Row>
      <Divider />
      <Title level={3}>Suggested Books</Title>
      <Row gutter={[16, 16]}>
        {suggestedBooks.length === 0 ? (
          <Alert message="No suggested books available" type="info" showIcon />
        ) : (
          suggestedBooks.map((book) => (
            <Col xs={24} sm={12} md={8} lg={6} key={book._id}>
              <BookCard book={book} />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default BookDetail;