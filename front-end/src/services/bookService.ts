import axiosInstance from './axios'

export const getAllBooks = async () => {
  const response = await axiosInstance.get('/books')
  return response.data.map((book: any) => ({
    id: book._id,
    name: book.name,
    author: book.author,
    price: book.rentalPrice,
    imageUrl: book.image || 'https://via.placeholder.com/150',
  }))
}

export const getBooksByGenre = async (genre: string) => {
  const response = await axiosInstance.get(`/api/books/genre/${genre}`)
  return response.data.map((book: any) => ({
    id: book._id,
    name: book.name,
    author: book.author,
    price: book.rentalPrice,
    imageUrl: book.image || 'https://via.placeholder.com/150',
  }))
}

export const getBookById = async (id: string) => {
  const response = await axiosInstance.get(`/api/books/${id}`)
  return response.data
}