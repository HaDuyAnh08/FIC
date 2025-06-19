import React, { useState } from 'react';
import { Input, Select } from 'antd';
const { Search } = Input;
const { Option } = Select;
import { useQuery } from '@tanstack/react-query';
import { getAllBooks, getBooksByGenre } from '../services/bookService';
import BookList from './BookList'; // Import BookList để truyền books

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('all');

  const { data: books = [] } = useQuery({
    queryKey: ['books', genre],
    queryFn: () => (genre === 'all' ? getAllBooks() : getBooksByGenre(genre)),
    enabled: !!genre,
  });

  const handleSearch = (value: string) => {
    console.log('Search:', value, genre);
    // Thêm logic tìm kiếm theo tên sách nếu có API
  };

  const handleGenreChange = (value: string) => {
    setGenre(value);
  };

  return (
    <div style={{ padding: '80px 20px 20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>Shop</h1>
      <img src="https://via.placeholder.com/1200x200" alt="Banner" style={{ width: '100%', marginBottom: '20px' }} />
      <Search
        placeholder="Search for all books & authors"
        onSearch={handleSearch}
        style={{ width: 400, marginBottom: '20px' }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Select defaultValue="all" style={{ width: 200, marginLeft: '20px' }} onChange={handleGenreChange}>
        <Option value="all">All Genres</Option>
        <Option value="Kinh tế">Kinh tế</Option>
        <Option value="Truyền thông">Truyền thông</Option>
        <Option value="Công nghệ">Công nghệ</Option>
        <Option value="Self-Help">Self-Help</Option>
        <Option value="Thiếu nhi">Thiếu nhi</Option>
      </Select>
      <BookList books={books} /> {/* Truyền books đến BookList */}
    </div>
  );
};

export default SearchBar;