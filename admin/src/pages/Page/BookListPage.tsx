import { useEffect, useState } from "react";
import api from "../../utils/axiosAuth";

const BookListPage = () => {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get("/admin/books");
        setBooks(res.data);
      } catch (error) {
        console.error("Failed to fetch books", error);
      }
    };

    fetchBooks();
  }, []);

  const handleDeleteBook = async (bookId: string) => {
    try {
      await api.delete(`/admin/books/${bookId}`);
      setBooks(books.filter((book) => book._id !== bookId));
      alert("Sách đã được xóa thành công!");
    } catch (error) {
      console.error("Failed to delete book", error);
      alert("Xóa sách thất bại!");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#1f2937",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          📚 Danh sách sách
        </h2>
        {books.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "#6b7280",
              fontStyle: "italic",
            }}
          >
            Không có sách nào để hiển thị.
          </p>
        ) : (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {books.map((book: any) => (
              <li
                key={book._id}
                style={{
                  padding: "12px",
                  backgroundColor: "#f9fafb",
                  borderRadius: "4px",
                  border: "1px solid #e5e7eb",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#e5e7eb")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f9fafb")
                }
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <strong
                      style={{
                        fontSize: "16px",
                        color: "#1f2937",
                      }}
                    >
                      {book.name}
                    </strong>
                    <span
                      style={{
                        marginLeft: "8px",
                        color: "#6b7280",
                        fontSize: "14px",
                      }}
                    >
                      – {book.author}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteBook(book._id)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#ef4444",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "4px",
                      fontSize: "14px",
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#dc2626")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#ef4444")
                    }
                  >
                    Xóa khỏi danh sách
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BookListPage;