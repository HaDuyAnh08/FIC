import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchBar from './searchBar';

function Home() {
  const [books, setBooks] = useState([]);
  const [selectedApi, setSelectedApi] = useState('');

  // Gọi API khi chọn thể loại
  useEffect(() => {
    if (!selectedApi) return;
    axios.get(selectedApi)
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, [selectedApi]);

const [selectedGenre, setSelectedGenre] = useState('');

const handleSearch = (filters) => {
  const query = new URLSearchParams(filters).toString();
  axios.get(`/api/books/search?${query}`)
    .then(res => setBooks(res.data.books || res.data))
    .catch(err => console.error(err));
};


  return (
    <div className="App">
      <h1>Thư viện sách</h1>

      {/* Thanh tìm kiếm */}
      <SearchBar onSearch={handleSearch} />

      {/* Nút chọn thể loại */}
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => { setSelectedGenre('Kinh tế'); setSelectedApi('/api/books/economics'); }}>📘 Kinh tế</button>
        <button onClick={() => { setSelectedGenre('Công nghệ'); setSelectedApi('/api/books/technology'); }}>💻 Công nghệ</button>
        <button onClick={() => { setSelectedGenre('Truyền thông'); setSelectedApi('/api/books/media'); }}>📡 Truyền thông</button>
        <button onClick={() => { setSelectedGenre('Self-Help'); setSelectedApi('/api/books/selfhelp'); }}>🌱 Self-Help</button>
        <button onClick={() => { setSelectedGenre('Thiếu nhi'); setSelectedApi('/api/books/children'); }}>👶 Thiếu nhi</button>

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
