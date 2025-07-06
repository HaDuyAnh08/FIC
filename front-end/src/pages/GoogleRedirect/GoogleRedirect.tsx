import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext"; // nếu bạn dùng AuthProvider

const GoogleRedirect = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { setToken, setRole } = useAuth(); // 👈 context lưu token

 useEffect(() => {
  const handleRedirect = async () => {
    const token = params.get("token");
    const role = params.get("role");

    if (!token || !role) {
      return navigate("/", { replace: true });
    }

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setToken(token);
    setRole(role);

    if (role === "admin") {
      setTimeout(() => {
        window.location.href = `http://localhost:5173/redirect?token=${encodeURIComponent(token)}&role=${encodeURIComponent(role)}`;
      }, 100);
    } else {
      navigate("/", { replace: true });
    }
  };

  handleRedirect(); // gọi hàm async
}, [params, navigate, setToken, setRole]);


  return <p>Redirecting...</p>;
};

export default GoogleRedirect;
