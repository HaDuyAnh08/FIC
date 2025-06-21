import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [filters, setFilters] = useState({
    name: '',
    genre: '',
    author: '',
    language: '',
    course: '',
  });

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
      <input
        type="text"
        name="name"
        placeholder="Tên sách"
        value={filters.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="genre"
        placeholder="Thể loại"
        value={filters.genre}
        onChange={handleChange}
      />
      <input
        type="text"
        name="author"
        placeholder="Tác giả"
        value={filters.author}
        onChange={handleChange}
      />
      <input
        type="text"
        name="language"
        placeholder="Ngôn ngữ"
        value={filters.language}
        onChange={handleChange}
      />
      <input
        type="text"
        name="course"
        placeholder="Khóa học"
        value={filters.course}
        onChange={handleChange}
      />
      <button type="submit">Tìm kiếm</button>
    </form>
  );
}

export default SearchBar;
