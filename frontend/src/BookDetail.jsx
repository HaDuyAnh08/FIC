import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`/api/books/${id}`)
      .then(res => setBook(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!book) return <p>Đang tải thông tin sách...</p>;

  return (
    <div>
      <h2>{book.name}</h2>
      <img src={book.image} alt={book.name} width="200" />
      <p><strong>Tác giả:</strong> {book.author}</p>
      <p><strong>Thể loại:</strong> {book.genre}</p>
      <p><strong>Năm xuất bản:</strong> {book.yearPublished}</p>
      <p><strong>Giá thuê:</strong> {book.rentalPrice} VND</p>
      <p><strong>Tình trạng:</strong> {book.stockStatus}</p>
      <p><strong>Mô tả:</strong> {book.description}</p>
      <p><strong>Khóa học:</strong> {book.course}</p>
      <p><strong>Ngôn ngữ:</strong> {book.languge}</p>
    </div>
  );
}

export default BookDetail;
