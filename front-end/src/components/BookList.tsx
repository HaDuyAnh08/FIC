import React from 'react';
import type { Book } from '../types';
import { Card, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom'; // Thêm useNavigate

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = React.useState(1);
  const navigate = useNavigate(); // Khởi tạo navigate

  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ padding: '20px', marginTop: '80px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {currentBooks.map((book) => (
          <Card
            key={book.id}
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                alt={book.name || 'Unknown'}
                src={book.image || 'https://via.placeholder.com/150'}
                style={{ width: '100%' }}
              />
            }
            onClick={() => navigate(`/book/${book.id}`)} // Thêm sự kiện nhấp
          >
            <h3>{book.name || 'Unknown Title'}</h3>
            <p>By {book.author || 'Unknown Author'}</p>
            <p>${book.rentalPrice ? book.rentalPrice.toFixed(2) : 'N/A'}</p>
          </Card>
        ))}
      </div>
      <Pagination
        current={currentPage}
        total={books.length}
        pageSize={itemsPerPage}
        onChange={handlePageChange}
        style={{ textAlign: 'center', marginTop: '20px' }}
      />
    </div>
  );
};

export default BookList;