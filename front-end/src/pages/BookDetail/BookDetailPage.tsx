import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Typography,
  Image,
  Spin,
  Alert,
  Button,
  InputNumber,
} from "antd";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import { getBookById } from "../../services/bookService";
import { useAuth } from "../../hooks/AuthContext";
import { addToCart } from "../../services/cartService";
import type { Book } from "../../types/bookType";
import { isAuthenticated } from "../../utils/auth";

const { Title, Paragraph, Text } = Typography;

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const [quantity, setQuantity] = useState(1);
  const { token } = useAuth();

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!id) {
        setError("Invalid book ID");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const bookData = await getBookById(id);
        if (!bookData) {
          setError("Book not found");
          setBook(null);
          setLoading(false);
          return;
        }

        setBook(bookData);
      } catch (err) {
        setError("Failed to load book details. Please try again later.");
        console.error("Error fetching book details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleAddToCart = async () => {
    if (!token) {
      alert("Please login to add items to cart.");
      return;
    }
    if (!book) return;
    try {
      await addToCart(book.id, token);
      alert("Book added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add book to cart. Please try again.");
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center", marginTop: "80px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error || !book) {
    return (
      <div
        style={{ padding: "20px", maxWidth: "1200px", margin: "80px auto 0" }}
      >
        <Alert message={error || "Book not found"} type="error" showIcon />
      </div>
    );
  }

  return (
    <div>
      <AppHeader isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div
        style={{ padding: "20px", maxWidth: "1200px", margin: "80px auto 0" }}
      >
        <Row gutter={[32, 32]}>
          <Col xs={24} md={8}>
            <Image
              src={book.image || "https://via.placeholder.com/300x450"}
              alt={`Cover of ${book.name || "Unknown"} by ${
                book.author || "Unknown"
              }`}
              preview={false}
              style={{ maxWidth: "100%", height: "450px", objectFit: "cover" }}
            />
          </Col>
          <Col xs={24} md={16}>
            <Title
              level={1}
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                textAlign: "center",
                color: "#333",
              }}
            >
              {book.name || "Unknown Title"}
            </Title>
            <Paragraph
              style={{
                fontSize: "14px",
                color: "#666",
                textAlign: "center",
                margin: "10px 0",
              }}
            >
              <Text strong>Author:</Text> {book.author || "Unknown Author"} |
              <Text strong>Genre:</Text> {book.genre || "N/A"} |
              <Text strong>Year:</Text> {book.yearPublished || "N/A"}
            </Paragraph>
            <Paragraph
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#ff0000",
                textAlign: "center",
                margin: "20px 0",
              }}
            >
              {book.rentalPrice
                ? `${book.rentalPrice.toLocaleString()} đ`
                : "N/A"}
            </Paragraph>
            <Paragraph
              style={{
                fontSize: "12px",
                color: "#666",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Status: {book.stockStatus || "Unknown"}
            </Paragraph>
            <Paragraph
              style={{
                fontSize: "16px",
                color: "#444",
                textAlign: "justify",
                lineHeight: "1.6",
              }}
            >
              {book.detail || "No description available."}
            </Paragraph>
            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <InputNumber
                min={1}
                value={quantity}
                onChange={(value) => setQuantity(value as number)}
                style={{ marginRight: "10px", width: "60px" }}
              />
              <Button
                type="primary"
                size="large"
                style={{
                  fontSize: "18px",
                  padding: "15px 30px",
                  background: "#1A73E8",
                  borderColor: "#1A73E8",
                }}
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <AppFooter />
    </div>
  );
};

export default BookDetailPage;
