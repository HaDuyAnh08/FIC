import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'
import BookList from '../components/BookList'
import { getAllBooks } from '../services/bookService'
import type { Book } from '../types'
import { isAuthenticated } from '../utils/auth'

const HomePage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { data: books = [], isLoading, error } = useQuery<Book[], Error>({
    queryKey: ['books', 'all'], // Mặc định lấy tất cả sách
    queryFn: getAllBooks,
  })

  useEffect(() => {
    setIsLoggedIn(isAuthenticated())
  }, [])

  const handleNavigation = () => {
    if (!isLoggedIn) {
      alert('Please login to continue.')
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading books</div>

  return (
    <div onClick={handleNavigation}>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <SearchBar />
      <BookList books={books} />
      <Footer />
    </div>
  )
}

export default HomePage