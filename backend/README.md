# 🥗 CheapTrip - Website Bán Đồ Ăn Healthy & Dinh Dưỡng

> **CheapTrip** là nền tảng thương mại điện tử phục vụ việc mua sắm các suất ăn healthy, thực đơn ăn kiêng (Clean Eating, Keto, Low-carb) và đồ uống dinh dưỡng chất lượng cao với chi phí hợp lý.

---

## 📌 MỤC LỤC
1. [Giới Thiệu Dự Án](#-giới-thiệu-dự-án)
2. [Tính Năng Chính](#-tính-năng-chính)
3. [Công Nghệ Sử Dụng](#-công-nghệ-sử-dụng)
4. [Cấu Trúc Thư Mục](#-cấu-trúc-thư-mục)
5. [Cài Đặt & Khởi Chạy](#-cài-đặt--khởi-chạy)

---

## 🌟 GIỚI THIỆU DỰ ÁN

CheapTrip giải quyết bài toán ăn uống lành mạnh của người tiêu dùng hiện đại bằng cách cung cấp giao diện trực quan, minh bạch thông tin dinh dưỡng (Calo, Protein, Carbs, Fat) cho từng món ăn. Hệ thống được thiết kế tối ưu, có khả năng mở rộng cao và hỗ trợ quản lý toàn diện từ khách hàng đến nhà quản trị.

---

## 🔥 TÍNH NĂNG CHÍNH

### 👤 Khách Hàng (User)
* **Khám phá món ăn:** Xem sản phẩm theo chế độ ăn (Clean Eating, Keto, Gymer, Vegan...).
* **Quản lý tài khoản:** Đăng ký, đăng nhập (JWT), Nêu cảm nghĩ của bạn về món ăn cho những người bạn khác.

### 🛡️ Quản Trị Viên (Admin Dashboard)
* **Quản lý sản phẩm:** Thêm, sửa, xóa món ăn, và tồn kho.
* **Quản lý đơn hàng:** Tiếp nhận, cập nhật trạng thái đơn (Chờ xử lý, Đang giao, Hoàn thành, Hủy).
* **Quản lý người dùng:** Theo dõi thông tin khách hàng, phân quyền (User/Admin).
* **Thống kê & Báo cáo:** Biểu đồ doanh thu, số lượng đơn hàng, món ăn bán chạy nhất.

---

## 🛠️ CÔNG NGHỆ SỬ DỤNG

* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** JSON Web Token (JWT), bcryptjs
* **Tools:** Postman, Git, VS Code

---

## 📂 CẤU TRÚC THƯ MỤC

```text
cheaptrip-backend/
├── src/
│   ├── config/          # Cấu hình Database, Cloudinary, Payment API
│   ├── controllers/     # Xử lý logic nghiệp vụ
│   ├── models/          # Định nghĩa Schema / Model dữ liệu
│   ├── routes/          # Định tuyến API Endpoints
│   ├── middlewares/     # Middleware xác thực (Auth), Upload, Error Handler
│   ├── utils/           # Mã hỗ trợ (JWT, Mailer, Formatters)
│   └── app.js           # Khởi chạy ứng dụng
├── .env.example         # File mẫu các biến môi trường
├── .gitignore           # Danh sách các file/thư mục bỏ qua khi push Git
├── package.json         # Khai báo dependencies và scripts
└── README.md            # Document dự án