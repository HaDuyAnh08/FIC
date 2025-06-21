import { Card, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { Book } from '../types';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const navigate = useNavigate();
  return (
    <Card
      hoverable
      cover={
        <Image
          alt={`Cover of ${book.name} by ${book.author}`}
          src={book.image || 'https://via.placeholder.com/150'}
          preview={false}
        />
      }
      onClick={() => navigate(`/book/${book._id}`)}
    >
      <Card.Meta
        title={book.name}
        description={
          <>
            <p>{book.author}</p>
            <p>Genre: {book.genre}</p>
            <p className="font-bold">${book.rentalPrice.toFixed(2)}</p>
            <p
              className={
                book.stockStatus === 'in stock' ? 'text-green-600' : 'text-red-600'
              }
            >
              {book.stockStatus}
            </p>
          </>
        }
      />
    </Card>
  );
};

export default BookCard;