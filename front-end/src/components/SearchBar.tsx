import React, { useState } from 'react';
import { Input, Select, Alert } from 'antd';
const { Search } = Input;
const { Option } = Select;
import { useQuery } from '@tanstack/react-query';
import { searchBooks } from '../services/bookService';
import BookList from './BookList';
import type { Book } from '../types/bookType';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genre, setGenre] = useState('all');

  const { data: books = [], isLoading, error } = useQuery<Book[], Error>({
    queryKey: ['books', searchTerm, genre],
    queryFn: () => searchBooks(searchTerm, genre),
    enabled: !!genre,
  });

  console.log('SearchBar:', { searchTerm, genre, isLoading, error, booksLength: books.length });

  const handleSearch = (value: string) => {
    setSearchTerm(value.trim());
  };

  const handleGenreChange = (value: string) => {
    setGenre(value);
  };

  if (error) {
    return <Alert message={`Error: ${error.message}`} type="error" showIcon />;
  }

  return (
    <div style={{ padding: '80px 20px 20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '20px' }}>Shop</h1>
      <img
        src="https://via.placeholder.com/1200x200"
        alt="Banner"
        style={{ width: '100%', marginBottom: '20px' }}
      />
      <Search
        placeholder="Search for books or authors"
        onSearch={handleSearch}
        style={{ width: 400, marginBottom: '20px' }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        allowClear
      />
      <Select
        defaultValue="all"
        style={{ width: 200, marginLeft: '20px' }}
        onChange={handleGenreChange}
      >
        <Option value="all">All Genres</Option>
        <Option value="Kinh tế">Kinh tế</Option>
        <Option value="Truyền thông">Truyền thông</Option>
        <Option value="Công nghệ">Công nghệ</Option>
        <Option value="Self-Help">Self-Help</Option>
        <Option value="Thiếu nhi">Thiếu nhi</Option>
      </Select>
      {isLoading ? (
        <div style={{ marginTop: '20px' }}>Loading...</div>
      ) : (
        <BookList books={books} />
      )}
    </div>
  );
};

export default SearchBar;