import React from "react";
import type { Book } from "../types/bookType";
import { Card, Pagination } from "antd";
import { useNavigate } from "react-router-dom";

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = React.useState(1);
  const navigate = useNavigate();

  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ padding: "20px", marginTop: "80px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        {currentBooks.map((book) => (
          <Card
            key={book.id}
            hoverable
            style={{ width: 240, textAlign: "center" }}
            cover={
              <img
                alt={book.name || "Unknown"}
                src={book.image || "https://via.placeholder.com/200x300"}
                style={{ width: "200px", height: "300px", objectFit: "cover" }}
              />
            }
            onClick={() => navigate(`/book/${book.id}`)}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#333",
                margin: "10px 0",
              }}
            >
              {book.name || "Unknown Title"}
            </h3>
            <p style={{ fontSize: "16px", color: "#666", margin: "5px 0" }}>
              By {book.author || "Unknown Author"}
            </p>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#ff0000",
                margin: "10px 0",
              }}
            >
              {book.rentalPrice
                ? `${book.rentalPrice.toLocaleString()} đ`
                : "N/A"}
            </p>
          </Card>
        ))}
      </div>
      <Pagination
        current={currentPage}
        total={books.length}
        pageSize={itemsPerPage}
        onChange={handlePageChange}
        style={{ textAlign: "center", marginTop: "20px" }}
      />
    </div>
  );
};

export default BookList;
