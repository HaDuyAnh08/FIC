import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [msg, setMsg] = useState('');
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Gọi API /api/hello
  useEffect(() => {
    axios.get('/api/hello')
      .then(res => setMsg(res.data.message))
      .catch(err => console.error(err));
  }, []);

  // Gọi API phân trang sách
  useEffect(() => {
    axios.get('/api/books/search', {
      params: {
        page: page,
        limit: 4
      }
    })
      .then(res => {
        setBooks(res.data.books || []);
        setTotalPages(res.data.pages || 1);
      })
      .catch(err => console.error(err));
  }, [page]);

  return (
    <div className="App">
      <h1>{msg}</h1>

      <h2>Danh sách sách:</h2>
      <ul>
        {books.map(book => (
          <li key={book._id}>
            <strong>{book.name}</strong> - {book.author} ({book.yearPublished})
          </li>
        ))}
      </ul>

      {/* Phân trang */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>
          Trang trước
        </button>
        <span style={{ margin: '0 10px' }}>Trang {page} / {totalPages}</span>
        <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
          Trang sau
        </button>
      </div>
    </div>
  );
}

export default App;
