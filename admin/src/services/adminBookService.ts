// admin/src/services/adminBookService.ts
import api from "../utils/axiosAuth";

export const addBook = async (bookData: {
  name: String;
  genre: String;
  author: String;
  yearPublished: Number;
  rentalPrice: Number;
  stockStatus: String;
  image: String;
  detail: String;
  stock: Number;               // nếu bạn vẫn muốn số lượng
}) => {
  const res = await api.post("/admin/books", bookData); // baseURL = :5000
  return res.data;  // { message, book }
};
