import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [books, setBooks] = useState([]);
  const [selectedApi, setSelectedApi] = useState('');

  useEffect(() => {
    if (!selectedApi) return;
    axios.get(selectedApi)
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, [selectedApi]);

  return (
    <div className="App">
      <h1>Thư viện sách</h1>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setSelectedApi('/api/books/economics')}>📘 Kinh tế</button>
        <button onClick={() => setSelectedApi('/api/books/technology')}>💻 Công nghệ</button>
        <button onClick={() => setSelectedApi('/api/books/media')}>📡 Truyền thông</button>
        <button onClick={() => setSelectedApi('/api/books/selfhelp')}>🌱 Self-Help</button>
        <button onClick={() => setSelectedApi('/api/books/children')}>👶 Thiếu nhi</button>
      </div>

      <ul>
        {books.map(book => (
          <li key={book._id}>
            <Link to={`/books/${book._id}`}>
              <strong>{book.name}</strong> – {book.author} ({book.yearPublished})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
