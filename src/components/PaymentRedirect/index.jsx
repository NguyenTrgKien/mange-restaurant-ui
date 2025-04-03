import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RedirectIfPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  useEffect(() => {
    if (location.search.includes("partnerCode=MOMO")) {  // Kiểm tra xem đường đãn có chứa partnerCode="MOMO" không nếu có thì chuyển hướng nó về trang payment-success để hiển thị thông tin giao dịch như thế nào
      navigate("/payment-success" + location.search, { replace: true });
    }
  }, [location, navigate]);

  return <h2>Đang xử lý thanh toán...</h2>;
}

export default RedirectIfPayment;
