import React, { useState } from "react";
import { Input, Select } from "antd";
import { useQuery } from "@tanstack/react-query";
import { searchBooks } from "../../services/bookService";
import BookList from "./BookList";
import type { Book } from "../../types/bookType";

const { Search } = Input;
const { Option } = Select;

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("all");

  const { data: books = [], isLoading } = useQuery<Book[], Error>({
    queryKey: ["books", searchTerm, genre],
    queryFn: () => searchBooks(searchTerm, genre),
    enabled: !!genre,
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value.trim());
  };

  const handleGenreChange = (value: string) => {
    setGenre(value);
  };

  return (
    <div style={{ padding: "80px 20px 20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>TÌM KIẾM</h1>
      <Search
        placeholder="Search for books or authors"
        onSearch={handleSearch}
        style={{ width: 400, marginBottom: "20px" }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        allowClear
      />
      <Select
        defaultValue="all"
        style={{ width: 200, marginLeft: "20px" }}
        onChange={handleGenreChange}
      >
        <Option value="all">Tất cả</Option>
        <Option value="Kinh tế">Kinh tế</Option>
        <Option value="Truyền thông">Truyền thông</Option>
        <Option value="Công nghệ">Công nghệ</Option>
        <Option value="Self-Help">Self-Help</Option>
        <Option value="Thiếu nhi">Thiếu nhi</Option>
      </Select>
      {isLoading ? (
        <div style={{ marginTop: "20px" }}>Loading...</div>
      ) : (
        <BookList books={books} />
      )}
    </div>
  );
};

export default SearchBar;
